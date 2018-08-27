import React from "react"
import PropTypes from "prop-types"
import {models} from  "we-edit"

export default class extends models.Paragraph{
	static contextTypes={
		color:PropTypes.bool
	}
	render(){
		let {color}=this.props
		let style=null
		if(this.context.color){
			style={color}
		}
		return <span style={style}>{this.props.children}</span>
	}
}
