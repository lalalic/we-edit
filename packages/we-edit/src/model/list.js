import React from "react"
import PropTypes from "prop-types"

import Component from "./component"

export default class List extends Component{
	static displayName="list"
	static propTypes={
		numId: PropTypes.string.isRequired,
		level: PropTypes.string.isRequired,
		label:PropTypes.node.isRequired,
		labelWidth: PropTypes.number.isRequired,
		format: PropTypes.string.isRequired,
	}
}
