import React from "react"
import PropTypes from "prop-types"

import Component from "./component"

export default class Row extends Component{
	static displayName="row"
	static propTypes={
		height: PropTypes.number,
		headers: PropTypes.number,
		footers: PropTypes.number,
		keepLines: PropTypes.bool,
		cols: PropTypes.arrayOf(PropTypes.shape({
			x: PropTypes.number,
			width:PropTypes.number
		})).isRequired
	}

	static defaultProps={
		headers:0,
		footers:0,
	}
}
