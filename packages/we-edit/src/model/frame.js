import React from "react"
import PropTypes from "prop-types"

import Component from "./component"

export default class Frame extends Component{
	static displayName="frame"
	static propTypes={
		x:PropTypes.number,
		y:PropTypes.number,
		z: PropTypes.number,
		width:PropTypes.number.isRequired,
		height:PropTypes.number.isRequired,
		padding:PropTypes.shape({
			left: PropTypes.number,
			top: PropTypes.number,
			right: PropTypes.number,
			bottom: PropTypes.number,
		}),
		margin:PropTypes.shape({
			left: PropTypes.number,
			top: PropTypes.number,
			right: PropTypes.number,
			bottom: PropTypes.number,
		}),
		geometry: PropTypes.string,
		blocks:PropTypes.arrayOf(PropTypes.element)
	}
	
	static defaultProps={
		margin:{
			left:0,right:0,top:0,bottom:0
		}
	}
}
