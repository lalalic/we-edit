import React, { Component } from "react";
import PropTypes from "prop-types";


export default ({ Text }) => class FieldBegin extends Component {
    static displayName = "fieldEnd";
    static contextTypes = {
        style: PropTypes.object
    };

    render() {
        return <Text {...{
            ...this.context.style,
            ...this.props,
            children: String.fromCharCode(0),
        }} />;
    }
};
