import React, {Component} from "react"
import PropTypes from "prop-types"
import {Editors} from  "we-edit-representation-html"

const {Paragraph}=Editors
export default class __$1 extends Component{
	static contextTypes={
		lineHeight: PropTypes.string,
		fonts: PropTypes.string,
		size: PropTypes.number,
	}
	render(){
		const {lineHeight="140%", fonts, size}=this.context
		const {spacing, numbering,indent, ...props}=this.props
		return (<Paragraph {...props} spacing={{lineHeight}} defaultStyle={{fonts,size}}/>)
	}
}
