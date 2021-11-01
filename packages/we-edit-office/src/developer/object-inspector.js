import React, { Component } from "react";
import { whenSelectionChangeDiscardable } from "we-edit";
import { compose, setDisplayName } from "recompose";
import ObjectTree from "../components/object-tree";

export default compose(
    setDisplayName("Content Properties"),
    whenSelectionChangeDiscardable(({ selection: { positioning, end: { id } = {} } }) => {
        if (id) {
            const { type, props } = positioning.getContent(id)?.toJS();
            const composer = positioning.getComposer(id);
            return { id, type, content: props, layout: composer?.props };
        }
    })
)(class extends Component {
    render() {
        const { type, id, style, content, layout } = this.props;
        return (
            <div style={style}>
                {id && <ObjectTree
                    value={{ type, id, props: { content, layout } }}
                    order={["id", "type"]}
                    filter={["__unnormalized", "hash", "children", "End"]} />}
            </div>
        );
    }
});
