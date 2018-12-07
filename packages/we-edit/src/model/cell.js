import React from "react"
import PropTypes from "prop-types"

import Component from "./component"

const border={
	sz: PropTypes.number,
	color: PropTypes.string
}

const defaultBorder={
	sz:1,
	color:"black"
}
export default class Cell extends Component{
	static displayName="cell"
	static propTypes={
		border:PropTypes.shape({
			left:PropTypes.shape(border),
			right:PropTypes.shape(border),
			top:PropTypes.shape(border),
			bottom:PropTypes.shape(border),
		}),
		margin: PropTypes.shape({
			left: PropTypes.number,
			right: PropTypes.number,
			top: PropTypes.number,
			bottom: PropTypes.number
		}),
		spacing: PropTypes.number,
		background: PropTypes.string,
		vertAlign: PropTypes.oneOf(["top","middle","center","bottom"])		
	}

	static defaultProps={
		border:{
			left:defaultBorder,
			right:defaultBorder,
			top:defaultBorder,
			bottom:defaultBorder
		},
		margin:{
			left:0,
			right:0,
			top:0,
			bottom:0
		},
		spacing:0,
		background:"transparent"
	}
}
