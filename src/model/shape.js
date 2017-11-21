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
		width:PropTypes.number.isRequired,
		height:PropTypes.number.isRequired,
		margin:PropTypes.shape({
			left:PropTypes.number,
			right:PropTypes.number,
			top:PropTypes.number,
			bottom:PropTypes.number
		})
	}
}