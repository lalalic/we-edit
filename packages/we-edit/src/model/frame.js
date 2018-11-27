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
		margin:PropTypes.shape({
			left:PropTypes.number,
			right:PropTypes.number,
			top: PropTypes.number,
			bottom: PropTypes.number
		}),
		border:PropTypes.shape({
			left:PropTypes.number,
			right:PropTypes.number,
			top: PropTypes.number,
			bottom: PropTypes.number
		}),
		padding:PropTypes.shape({
			left:PropTypes.number,
			right:PropTypes.number,
			top: PropTypes.number,
			bottom: PropTypes.number
		})
	}
}
