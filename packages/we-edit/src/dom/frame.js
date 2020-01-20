import React from "react"
import PropTypes from "prop-types"

import Component from "./component"

export default class Frame extends Component{
	static displayName="frame"
	static propTypes={
		width:PropTypes.number.isRequired,
		height:PropTypes.number,
		named: PropTypes.string,
		cols:PropTypes.arrayOf(PropTypes.shape({
			x:PropTypes.number,
			width:PropTypes.number.isRequired,
			y:PropTypes.number,
			height:PropTypes.number,
		})),
		margin:PropTypes.shape({
			left: PropTypes.number,
			right:PropTypes.number,
			top:PropTypes.number,
			bottom: PropTypes.number,
		}),
		x: PropTypes.number,
		y: PropTypes.number,
		z: PropTypes.number,
		vertAlign: PropTypes.oneOf(["top","middle","center","bottom"]),
		isTop:PropTypes.bool,
	}
}
