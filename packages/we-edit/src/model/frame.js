import React from "react"
import PropTypes from "prop-types"

import Component from "./component"

export default class Frame extends Component{
	static displayName="frame"
	static propTypes={
		width:PropTypes.number.isRequired,
		height:PropTypes.number,
		named: PropTypes.string,
		geometry: PropTypes.string,
		blocks:PropTypes.arrayOf(PropTypes.element),
		vertAlign: PropTypes.oneOf(["top","middle","bottom"])
	}
}
