import React, { Component } from "react";
import PropTypes from "prop-types";
import { ReactQuery } from "we-edit";
import memoize from "memoize-one";


export default ({ Text }) => class FieldBegin extends Component {
    static displayName = "fieldBegin";
    static contextTypes = {
        style: PropTypes.object,
        notifyVariable: PropTypes.func,
    };

    constructor() {
        super(...arguments);
        this.replaceVariable = this.replaceVariable.bind(this);
    }

    getVariableDefinition = memoize(props => {
        return {
            ...props,
            replaceVariable: this.replaceVariable
        };
    });

    render() {
        const { context: { notifyVariable }, props } = this;
        if (notifyVariable) {
            notifyVariable(this.getVariableDefinition(this.props));
        }
        return <Text {...{
            ...this.context.style,
            ...this.props,
            children: String.fromCharCode(0),
        }} />;
    }

    replaceVariable(element, values, composed) {
        const { props: { display, id } } = this;
        const value = values[id];
        if (value == display)
            return element;
        const $ = new ReactQuery(element);
        const text = (all => all[1 + all.findIndex(a => a.props.id == id)])($.find(`[id="${id}"],text`).toArray());
        return $.replace(text, React.cloneElement(text, { children: value })).get(0);
    }
};
