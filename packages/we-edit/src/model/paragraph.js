import React from "react"
import PropTypes from "prop-types"

import Component from "./component"


export default class Paragraph extends Component{
	static displayName="paragraph"
	static propTypes={
		spacing: PropTypes.shape({
			lineHeight:PropTypes.oneOfType([PropTypes.string,PropTypes.number]),
			top:PropTypes.number,
			bottom:PropTypes.number
		}).isRequired,
		indent: PropTypes.shape({
			left:PropTypes.number,
			right:PropTypes.number,
			firstLine:PropTypes.number
		}).isRequired,
		align:PropTypes.string,
		numbering: PropTypes.shape({
			label: PropTypes.node.isRequired
		})
	}

	static defaultProps={
		spacing:{},
		indent:{}
	}

	static End=String.fromCharCode(0xb6)
}
