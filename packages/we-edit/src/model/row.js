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
	}

	static defaultProps={
		headers:0,
		footers:0,
	}

	static contextTypes={
		cols: PropTypes.arrayOf(PropTypes.number)
	}
}
