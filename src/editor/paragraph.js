import React,{PropTypes} from "react"

import Group from "../composed/group"

import {Paragraph} from "../content"
import editable from "./editable"
import Inline from "./inline"
import Text from "./text"


export default class extends editable(Paragraph){
	whatIfEmpty(){
		this.state.content.push(<Inline contentStyle={this.context.getDefaultStyle("inline")}><Text> </Text></Inline>)
	}
	
	createComposed2Parent(props){
		let line=super.createComposed2Parent(...arguments)
		let {width,height}=line.props
		let ps={width,height}
		if(this.composed.length==1)
			ps._id=this._id
		return <Group {...ps}>{line}</Group>
	}
	
	_isLastComposedFitIntoParent(){
		return true	
	}
	
	appendLastComposed(){
		this.lastComposed.forEach(one=>{
			this.composed.push(one)
			this.context.parent.appendComposed(this.createComposed2Parent(one))
		})
		this.lastComposed=null
	}
}
