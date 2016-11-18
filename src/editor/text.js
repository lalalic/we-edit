import React,{PropTypes} from "react"
import ReactDOM from "react-dom"
import {connect} from "react-redux"
import offset from "mouse-event-offset"

import {Text} from "../content"
import editable from "./editable"

import Group from "../composed/group"
import * as Selection from "./selection"


const Super=editable(Text)
export class EditableText extends Super{
	constructor(){
		super(...arguments)
		this.state=Object.assign(super.state||{},{content:this.props.children})
	}
	
	getContentCount(){
		return 1
	}
}

import {getContent} from "./selector"

export const ACTION={
	INSERT: text=>({type:"insert.text",payload:text})
}

export const reducer=(state, {type,payload})=>{
	switch(type){
	case "insert.text":
		const {start,end}=state.selection
		if(start==end){
			let content=getContent(state, start.content)
			let newText=content.children.splice(start.at,payload.length,payload)
			
		}else{
			
		}
	break
	}
	return state
}

export default EditableText