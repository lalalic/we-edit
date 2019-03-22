import React from "react"
import PropTypes from "prop-types"

import Component from "./component"


export default class Table extends Component{
	static displayName="table"
	static propTypes={
		width: PropTypes.number.isRequired,
		headers: PropTypes.number,
		indent: PropTypes.number
	}

	static defaultProps={
		headers:0,
		indent:0
	}
}
