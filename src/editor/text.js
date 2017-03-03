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

const DOMAIN="text"
export const ACTION={
	INSERT: t=>(dispatch, getState)=>{
		const state=getState()
		const {start:{id,at},end}=state.selection
		if(id==end.id){
			let content=getContent(id)
			let text=content.getContent()
			let newText=text.substring(0,at)+t+text.substr(end.at)
			content.setState({content:newText}, e=>{
				content.reCompose()
				dispatch(Selection.ACTION.SELECT(id,at+t.length))
			})
		}else{

		}
	}
	,REMOVE: n=>(dispatch, getState)=>{
		const state=getState()
		const {start:{id,at},end}=state.selection
		if(id==end.id){
			let content=getContent(id)
			let text=content.getContent()
			let newText=text.substring(0,at-n)+text.substr(end.at)
			content.setState({content:newText}, e=>{
				content.reCompose()
				dispatch(Selection.ACTION.SELECT(id,at-n))
			})
		}else{

		}
	}
}

export default EditableText
