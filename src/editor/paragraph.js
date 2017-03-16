import React,{PropTypes} from "react"

import Group from "../composed/group"

import {Paragraph} from "../content"
import editable from "./editable"
import Inline from "./inline"
import Text from "./text"

import {uuid} from "tools/uuid"


export default class extends editable(Paragraph){
	emptyContent(){
		return [<Inline key={uuid()}><Text key={uuid()}> </Text></Inline>]
	}

	createComposed2Parent(props){
		let line=super.createComposed2Parent(...arguments)
		let {width,height}=line.props
		let ps={width,height}
		if(this.computed.composed.length==1)
			ps.id=this.id
		return <Group {...ps}>{line}</Group>
	}

	_isLastComposedFitIntoParent(){
		return true
	}

	/**
	 *  isAllChildrenComposed will affect last line height, so here we need make it right
	 */
	appendLastComposed(){
		let children=this.computed.children
		this.computed.children=[]//make isAllChildrenComposed right
		let len=this.computed.lastComposed.length
		this.computed.lastComposed.forEach((one,i)=>{
			this.computed.composed.push(one)
			if(i==len-1){//make isAllChildrenComposed right
				this.computed.children=children
			}
			this.context.parent.appendComposed(this.createComposed2Parent(one))
		})
		this.context.parent.on1ChildComposed(this)
		this.computed.lastComposed=null
	}
}
