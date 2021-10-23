import React, { Fragment, PureComponent } from "react";
import PropTypes from "prop-types";
import { ACTION, whenSelectionChangeDiscardable, dom, ReactQuery } from "we-edit";
import { Geometry, Composed } from "we-edit-representation-pagination";
import { SvgIcon, MenuItem } from "material-ui";
import memoize from "memoize-one";
import { compose, setDisplayName } from "recompose";
import FontKit from "fontkit";
import DropDownButton from "../components/drop-down-button";
import ContextMenu from "../components/context-menu";
import Setting from "./panel";
import Layout from "./layout";
import textbox from "./text-box";
import flowchart from "!!file-loader?name=[name].[ext]!./flowchart.ttf";
import shapes from "!!file-loader?name=[name].[ext]!./shapes.ttf";

const { Shape } = dom;
export default compose(
    setDisplayName("DrawShape"),
    whenSelectionChangeDiscardable(({ selection }) => {
        if (selection) {
            const shape = selection.props("shape", false);
            const image = selection.props("image", false);
            return { selection, style: image || shape, type: image ? "Image" : "Shape" };
        }
        return {};
    })
)(class DrawShape extends PureComponent {
    static defaultProps = {
        shapeProps: {
            fill: { color: "blue" },
            outline: { width: 1, color: "black" }
        },
        anchorProps: {},
        frameProps: {
            margin: 5
        },
        anchor({ x, y }, positioning) {
            const props = {};
            const { left, top } = positioning.responsible.asViewportPoint({ x, y });
            const { id, at, page: i } = positioning.around(left, top);
            const topFrame = positioning.pages[i];
            const xy = positioning.pageXY(i);
            const page = { x: x - xy.x, y: y - xy.y };
            props.page = { ...page, i, id: topFrame.props.id };

            if (id == undefined)
                return props;

            const target = positioning.getComposer(id);
            const frame = target.closest(a => a.isFrame);
            if (frame == topFrame) {
                props.current = props.page;
            } else {
                const current = positioning.getFrameOffsetGrandFrame(topFrame, frame);
                [current.x, current.y, current.id] = [page.x - current.x, page.y - current.y, frame.props.id];
                props.current = current;
            }

            const paragraph = target.closest(a => a.getComposeType() == 'paragraph' || a == frame);
            if (paragraph && paragraph != frame) {
                props.paragraph = { id: paragraph.props.id, ...page };
                const { first, parents } = new ReactQuery(topFrame.createComposed2Parent())
                    .findFirstAndParents(`[data-content="${paragraph.props.id}"]`);
                [...parents, first.get(0)].filter(a => !!a).reduce((p, { props: { y = 0, x = 0 } }) => {
                    p.x -= x;
                    p.y -= y;
                    return p;
                }, props.paragraph);

                if (target != paragraph)
                    props.inline = { id, at };
            }

            return props;
        }
    };
    static contextTypes = {
        panelManager: PropTypes.any,
    };
    state = {};
    componentDidMount() {
        try {
            Promise.all([fetch(flowchart), fetch(shapes)])
                .then(ress => Promise.all(ress.map(a => a.arrayBuffer())))
                .then(([flowchart, shapes]) => {
                    this.setState({
                        flowcharts: FontKit.create(Buffer.from(flowchart)),
                        varishapes: FontKit.create(Buffer.from(shapes))
                    });
                });
        } catch (e) {
        }
    }

    render() {
        const { props: { children, shapes = [], defaultShape, style, type = "Shape", color = "black" }, state: { flowcharts, varishapes } } = this;
        return (
            <ContextMenu.Support menus={!style ? null :
                (
                    <Fragment>
                        <MenuItem primaryText={`Format ${type}...`} onClick={e => this.context.panelManager.toggle(Setting.panel)} />
                        <MenuItem primaryText={`Layout ${type}...`} onClick={e => this.context.panelManager.toggle(Layout.panel)} />
                    </Fragment>
                )}>
                <Fragment>
                    <DropDownButton
                        hint="draw shape"
                        icon={<IconShape />}
                        style={{ width: 200 }}
                        menuStyle={{ width: "30%" }}
                        onClick={defaultShape ? e => this.send(defaultShape) : null}>
                        {this.shapes(shapes, flowcharts, varishapes)}
                    </DropDownButton>
                    {[textbox, ...React.Children.toArray(children)].map((a, key) => {
                        return React.cloneElement(a, { key, onClick: e => this.send(a.props.create), create: undefined });
                    })}
                </Fragment>
            </ContextMenu.Support>
        );
    }

    fontShape = ({ name, path, bbox: { minX, maxX, minY, maxY } = {} }, { code, kind, font }) => {
        if (!path.commands.length)
            return;
        const { shapeProps, anchorProps, frameProps } = this.props;
        const shape = new Geometry(path.toSVG()), size = { width: maxX - minX, height: maxY - minY };
        const d = shape.clone().scale(24 / font.unitsPerEm).round(2).toString();
        const fn = ({ motionRoute: geometry, target }, { positioning, anchor, dispatch, type = "shape" } = {}) => {
            const { left, top, right, bottom, w = right - left, h = bottom - top } = geometry.bounds();
            const revised = () => shape.clone().scale(Math.min(w / size.width, h / size.height));

            if (!positioning) {
                if (!target) {
                    return <Shape {...shapeProps} geometry={d} />;
                }
                return <Shape {...shapeProps} geometry={revised().translate(left, top).round(2).toString()} />;
            }
            dispatch(ACTION.Entity.CREATE({
                type,
                shape: {
                    ...shapeProps,
                    kind: `${kind}-${name}`,
                    geometry: revised(),
                },
                frame: frameProps,
                anchor: {
                    ...anchorProps,
                    ...anchor({ x: left, y: top }, positioning),
                }
            }));
        };
        return fn;
    };

    shapes = memoize((shapes, flowcharts, varishapes) => {
        flowcharts = flowcharts && {
            name: "flowcharts",
            children: flowcharts.characterSet
                .map(code => this.fontShape(flowcharts.glyphForCodePoint(code), { font: flowcharts, code, kind: "flowchart" }))
                .filter(a => !!a)
        };

        varishapes = varishapes && {
            name: "shapes",
            children: varishapes.characterSet
                .map(code => this.fontShape(varishapes.glyphForCodePoint(code), { font: varishapes, code, kind: "shape" }))
                .filter(a => !!a)
        };
        const { iconSize = 36 } = this.props;
        const IconGeometry = Object.freeze(Geometry.fromRect({ width: iconSize, height: iconSize }));
        return [...shapes, flowcharts, varishapes].filter(a => !!a).map(({ name, children }) => {
            const icons = children.map((a, i) => {
                const icon = a({ motionRoute: IconGeometry });
                if (!icon)
                    return null;
                const { props: { outline, fill, geometry }, type } = icon;
                return (
                    <SvgIcon key={i} title={a.name} onClick={e => this.send(a)}
                        viewBox={`0 0 ${iconSize} ${iconSize}`}
                        style={{ border: "1px solid transparent", borderRadius: 2, width: iconSize, height: iconSize }}
                        onMouseEnter={e => e.currentTarget.style.borderColor = "lightgray"}
                        onMouseLeave={e => e.currentTarget.style.borderColor = "transparent"}>
                        {type == dom.Shape ? <Composed.Shape {...outline} fille={fill} d={centerAndSize(geometry, iconSize)} /> : icon}
                    </SvgIcon>
                );
            }).filter(a => !!a);
            return icons.length && (
                <div key={name}>
                    <div style={{ background: "lightgray", border: "outset 1px solid", fontSize: "smaller", paddingLeft: 4, marginBottom: 2 }}>{name}</div>
                    <div style={{ paddingLeft: 2 }}>{icons}</div>
                </div>
            );
        });
    });

    send(fn) {
        const { props: { selection: { positioning }, dispatch, anchor, anchorProps, shapeProps, frameProps } } = this;
        dispatch(ACTION.UI({
            draw: (
                <Shape.OverlayWhenMouseDown {...fn.props}
                    onMouseUp={e => {
                        dispatch(ACTION.UI({ draw: null }));
                        fn(e, { positioning, dispatch, anchor, anchorProps, shapeProps, frameProps });
                    }}>
                    {(overlay) => {
                        if (!overlay.state.triggered)
                            return <rect style={{ width: "100%", height: "100%", fill: "transparent", cursor: "crosshair", opacity: 0.6 }} />;
                        return fn(overlay);
                    }}
                </Shape.OverlayWhenMouseDown>
            )
        }));
    }
});
function centerAndSize(d, size = 48) {
    const contentSize = parseInt(size * 2 / 3);
    const geometry = typeof (d) == "string" ? new Geometry(d) : d;
    const { right, left, top, bottom, w = right - left, h = bottom - top } = geometry.bounds();
    if (w > contentSize || h > contentSize) {
        geometry.scale(Math.min(contentSize / w, contentSize / h));
    }
    const center = geometry.center(), o = size / 2;
    geometry.translate(o - center.x, o - center.y);
    return geometry.round(2).toString();
}
const IconShape = props => (
    <SvgIcon {...props}>
        <rect {...{ width: 18, height: 18, x: 1, y: 1, fill: "black" }} />
        <circle {...{ r: 8, cx: 15, cy: 15, stroke: "black", fill: "white" }} />
    </SvgIcon>
);
