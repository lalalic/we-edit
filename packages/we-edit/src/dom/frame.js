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
		cols:PropTypes.arrayOf(PropTypes.shape({
			x:PropTypes.number,
			width:PropTypes.number.isRequired,
		})),
		vertAlign: PropTypes.oneOf(["top","middle","center","bottom"])
	}
}
