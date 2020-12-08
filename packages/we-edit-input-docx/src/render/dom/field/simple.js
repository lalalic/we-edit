import React, { Component } from "react";
import PropTypes from "prop-types";
import { ReactQuery } from "we-edit";
import memoize from "memoize-one";


export default ({ Container }) => class SimpleField extends Component {
    static displayName = "field";
    static contextTypes = {
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
        return <Container {...this.props} />
    }

    replaceVariable(element, values, composed) {
        const { props: { display, id } } = this;
        const value = values[id];
        if (value == display)
            return element;
        const $ = new ReactQuery(element);
        const text = $.findFirst(`[id="${id}"]`).findFirst('text');
        return $.replace(text, React.cloneElement(text.get(0), { children: value })).get(0);
    }
};
