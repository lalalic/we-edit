import React from "react"
import PropTypes from "prop-types"

import Component from "./component"


export default class Paragraph extends Component{
	static displayName="paragraph"
	static propTypes={
		spacing: PropTypes.shape({
			lineHeight:PropTypes.string,
			top:PropTypes.number,
			bottom:PropTypes.number
		}).isRequired,
		indent: PropTypes.shape({
			left:PropTypes.number,
			right:PropTypes.number,
			firstLine:PropTypes.number,
			hanging:PropTypes.number
		}).isRequired,
		align:PropTypes.string
	}
	
	static defaultProps={
		spacing:{},
		indent:{}
	}
}
