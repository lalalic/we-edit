import React, { Component } from "react"
import PropTypes from "prop-types"
import Group from "../../../composed/group"
import { ReactQuery } from "we-edit";

export default class InlineSegments extends Component {
    static propTypes = {
        left: PropTypes.number,
        segments: PropTypes.arrayOf(InlineSegment)
    };
    static create({ segments = [], ...props }) {
        return new InlineSegments({ segments: segments.map(a => new InlineSegment(a)), ...props });
    }
    constructor({ segments = [] } = { segments: [] }) {
        super(...arguments);
        this.segments = segments;
    }
    get items() {
        return this.segments.reduce((all, segment) => [...all, ...segment.items], []);
    }
    get current() {
        return this.segments.findLast((a, i) => a.items.length > 0 || i == 0);
    }
    get currentX() {
        const { x = 0, items } = this.current;
        return items.reduce((X, { props: { width = 0 } }) => X + width, x);
    }
    shouldRelayout({ segments }) {
        const bSame = segments
            && this.segments.length == segments.length
            && !this.segments.find(({ props: a }, i, c, b = segments[i]) => !(b && a.x == b.x && a.width == b.width));
        return segments && !bSame;
    }
    relayout(props, ...atoms) {
        const relayout = this.constructor.create({ ...this.props, ...props });
        const items = [...this.items, ...atoms];
        let i = 0, len = items.length;
        for (let j = 0, l = relayout.segments.length; j < l; j++) {
            let segment = relayout.segments[j];
            for (; i < len; i++) {
                let item = items[i];
                if (segment.push(item) === false) {
                    break;
                }
                else {
                    continue;
                }
            }
        }
        if (i < len) {
            return false;
        }
        return relayout;
    }
    replace(atom,changed){
        for(let i=this.segments.length-1;i>-1;i--){
            for(let items=this.segments[i].items,k=items.length-1;k>-1;k--){
                if(items[k]===atom){
                    items[k]=changed
                    return 
                }
            }
        }
    }

    push() {
        const i = this.segments.findLastIndex((a, i) => a.items.length > 0 || i == 0);
        return !!this.segments.slice(i).find(a => {
            if (a.push(...arguments) !== false) {
                return true;
            }
        });
    }
    render() {
        const { left = 0 } = this.props;
        const { flat } = this.segments
            .reduce(({ X, flat }, { items, props: { x = 0, width = 0 } }, i) => {
                /**non text atom set y=-height, so line based baseline in @story can be implemented,   */
                items=items.map(a=>a.props.height && !isText(a) ?  React.cloneElement(a,{y:-a.props.height}) : a)
                flat.splice(flat.length, 0, ...(X != x ? [<Group x={X - left} width={x - X} />, ...items] : items));
                return { X: x + width, flat };
            }, { flat: [], X: left });
        return <Group {...{ x: left, children: flat }} />;
    }
}

class InlineSegment extends Component {
    static propTypes = {
        x: PropTypes.number,
        width: PropTypes.number,
    };
    constructor({ x, width }) {
        super(...arguments);
        this.items = [];
    }
    get contentWidth() {
        return this.items.reduce((X, a) => X + a.props.width, 0);
    }
    get availableWidth() {
        return this.props.width - this.contentWidth;
    }
    push(atom, must) {
        if (must) {
            this.items.push(atom);
            return;
        }
        const { width = 0, minWidth = width } = atom.props;
        if (minWidth == 0 || this.availableWidth >= minWidth) {
            this.items.push(atom);
        }
        else {
            return false;
        }
    }
    //****InlineSegments doesn't use it
    render() {
        const { x = 0, width } = this.props;
        let X = x;
        return (<Group x={x} width={width}>
            {this.items.map(a => {
                const located = React.cloneElement(a, { x: X });
                X += (a.props.width || 0);
                if(!isText(a) && a.props.height){
                    return React.cloneElement(located,{y:-a.props.height})
                }
                return located;
            })}
        </Group>);
    }
}

const isText=a=>a.props.descent!==undefined
