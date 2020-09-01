import React from "react"
import PropTypes from "prop-types"

import Component from "./component"

export default class Shape extends Component{
	static displayName="shape"

	static propTypes={
		position:PropTypes.shape({
			x:PropTypes.number,
			y:PropTypes.number
		}),
		width:PropTypes.number,
		height:PropTypes.number,
		margin:PropTypes.shape({
			left:PropTypes.number,
			right:PropTypes.number,
			top:PropTypes.number,
			bottom:PropTypes.number
		}),
		geometry:PropTypes.string,//svg path
		outline:this.LineShape,
		solidFill: PropTypes.string,
		blipFill: PropTypes.shape({
			url: PropTypes.string,
		}),
		rotate:PropTypes.number,
		scale:PropTypes.number,
	}

	static defaultProps={
		margin:{
			left:0,
			right:0,
			top:0,
			bottom:0,
		}
	}
}
