import React, {Component} from "react"
import PropTypes from "prop-types"
import {Editors} from  "we-edit-representation-html"


export default class extends Component{
	static contextTypes={
		lineHeight: PropTypes.string,
		fonts: PropTypes.string,
		size: PropTypes.number,
	}
	render(){
		const {lineHeight="140%", fonts, size}=this.context
		const {spacing={}, numbering, ...props}=this.props
		return (<Editors.Paragraph {...props} spacing={{lineHeight}} defaultStyle={{fonts,size}}/>)
	}
}
