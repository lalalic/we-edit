import React, { PureComponent } from "react";
import { DocumentTree } from "we-edit";
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
                <div style={{ flex: "auto", overflow: "scroll" }}>
                    <DocumentTree {...props} filter={({ id, type }) => {
                        return !filter ? true : `${type}(${parseInt(id)})`.indexOf(filter) != -1;
                    }} />
                </div>
                <div style={{ flex: "1 0 30%", borderTop: "1px solid lightgray", marginTop: 10, paddingTop: 10, overflow: "scroll" }}>
                    <ObjectInspector />
                </div>
            </div>
        );
    }
}
