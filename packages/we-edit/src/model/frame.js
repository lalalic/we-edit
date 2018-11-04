import React from "react"
import PropTypes from "prop-types"

import Component from "./component"

export default class Frame extends Component{
	static displayName="frame"
	static propTypes={
		position:PropTypes.shape({
			x:PropTypes.number,
			y:PropTypes.number
		}),
		width:PropTypes.number.isRequired,
		height:PropTypes.number.isRequired,
	}
}
