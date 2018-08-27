import React,{Component, Fragment} from "react"
import PropTypes  from "prop-types"

import {models} from "we-edit"

export default class extends models.Paragraph{
	static contextTypes={
		line:PropTypes.bool
	}
	
	render(){
		return (
			<p>{this.props.children}</p>
		)
	}
	
	componentDidMount(){
		const {line}=this.props
		const {composed}=this.state
		if(this.composed){
			return 
		}
		
		
	}
}