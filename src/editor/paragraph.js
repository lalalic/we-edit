import React,{PropTypes} from "react"
import Immutable from "immutable"

import Group from "../composed/group"

import {Paragraph} from "../content"
import editable from "./editable"
import Inline from "./inline"
import Text from "./text"


export default class extends editable(Paragraph){
	constructor(){
		super(...arguments)
		if(this.isEmpty())
			this.state.content=[<Inline contentStyle={this.context.getDefaultStyle("inline")}><Text> </Text></Inline>]
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
	
	/**
	 *  isAllChildrenComposed will affect last line height, so here we need make it right
	 */
	appendLastComposed(){
		let children=this.children
		this.children=[]//make isAllChildrenComposed right
		let len=this.lastComposed.length
		this.lastComposed.forEach((one,i)=>{
			this.composed.push(one)
			if(i==len-1){//make isAllChildrenComposed right
				this.children=children
			}
			this.context.parent.appendComposed(this.createComposed2Parent(one))
		})
		this.context.parent.on1ChildComposed(this)
		this.lastComposed=null
	}
}
