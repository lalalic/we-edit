import React from "react"
import PropTypes from "prop-types"

import Component from "./component"

/**
 * shape has two types: static, and dynamic 
 * static: fixed size
 * dynamic: size decided by children content, so the shape is drawn with content size
 * 
 * shape itself has following 
 */
export default class Shape extends Component{
	static displayName="shape"

	static propTypes={
		geometry:PropTypes.string,//svg path
		outline:this.LineShape,
		fill: this.FillShape,

		autofit: PropTypes.oneOf([true,"larger"]),
		autofitHeight: PropTypes.number,
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
