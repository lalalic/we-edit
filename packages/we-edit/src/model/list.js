import React from "react"
import PropTypes from "prop-types"

import Component from "./component"

export default class List extends Component{
	static displayName="list"
	static propTypes={
		numId: PropTypes.string,
		level: PropTypes.string,
		label:PropTypes.node.isRequired,
		labelWidth: PropTypes.number.isRequired,
		format: PropTypes.string,
	}
}
