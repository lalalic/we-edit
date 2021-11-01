import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { DocumentTree } from "we-edit";
import IconButton from "../components/size-icon-button";
import IconDocTree from "material-ui/svg-icons/action/list";
import ObjectInspector from "./object-inspector";


export default class FilterDocumentTree extends PureComponent {
    constructor() {
        super(...arguments);
        this.state = {};
    }
    render() {
        const { state: { filter }, props } = this;
        return (
            <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
                <div>
                    <input style={{ width: "100%", display: "block" }}
                        value={filter || ""}
                        onChange={e => {
                            this.setState({ filter: e.target.value });
                        }} />
                </div>
                <div style={{ flex: "none", overflow: "scroll" }}>
                    <DocumentTree {...props} filter={({ id, type }) => {
                        return !filter ? true : `${type}(${parseInt(id)})`.indexOf(filter) != -1;
                    }} />
                </div>
                <div style={{ flex: 1, height: 200, borderTop: "1px solid lightgray", marginTop: 10, paddingTop: 10, overflow: "scroll" }}>
                    <ObjectInspector />
                </div>
            </div>
        );
    }

    static panel = <FilterDocumentTree title="Document Tree" toNodeProps={({ id, type }) => ({ name: `${type}(${id.split("{")[0]})` })} />;
    static Button = class extends PureComponent {
        static contextTypes = {
            panelManager: PropTypes.any
        };

        render() {
            const { title = FilterDocumentTree.panel.props.title, whichPanel = "right", ...props } = this.props;
            return (
                <IconButton
                    {...props}
                    hint={title}
                    onClick={() => this.context.panelManager.toggle(FilterDocumentTree.panel, whichPanel)}>
                    <IconDocTree />
                </IconButton>
            );
        }
    };
}
