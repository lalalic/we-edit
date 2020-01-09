import React, { Component } from "react";
class Selector extends Component {
	render() {
		const { onSelect, cursor, size = 5, ...props } = this.props;
		return <line {...props} stroke="transparent" strokeWidth={size} style={{ cursor }} onClick={onSelect} />;
	}
}
export const RowSelector = props => <Selector {...props} cursor="e-resize" />;
export const ColSelector = props => <Selector {...props} cursor="s-resize" />;
