import React, {PropTypes} from "react"
import Base from "../document"

import {ACTION,Cursor,Selection} from "state"

import {editable} from "model/edit"
import recomposable from "./recomposable"

import uuid from "tools/uuid"

export default class Document extends editable(recomposable(Base)){
	uuid=`doc${uuid()}`
	render(){
        return (
			<div id={this.uuid}>
				<div ref="main">
					{super.render()}
				</div>
				<Selection id={this.uuid}/>
				<StateCursor id={this.uuid}/>
			</div>
		)
    }

	componentDidMount(){
		if(super.componentDidMount)
			super.componentDidMount()
		
		this.cursorReady()
	}
	
	refreshComposed(){
		this.composed.forceUpdate()
	}
	
	_reComposeFrom(section){
		let index=this.computed.children.findIndex(a=>a==section)
		this.computed.children.splice(index,1)
	}

	get root(){
		return this.refs.main.querySelector("svg")
	}

	cursorReady(){
		let firstText=this.root.querySelector("text[data-content]").getAttribute("data-content")
		this.context.store.dispatch(ACTION.Selection.SELECT(firstText,0))
		this.root.addEventListener("click", e=>{
			const target=e.target
			switch(target.nodeName){
			case 'text':
				let text=target.textContent
				let contentEndIndex=target.getAttribute("end")
				let contentID=target.getAttribute("data-content")
				let [x]=offset(e, target)
				this.context.store.dispatch(ACTION.Cursor.AT(contentID,contentEndIndex-text.length, x))
			break
			}
		})
	}
	
	static contextTypes={
		store:PropTypes.any
	}
}

import offset from "mouse-event-offset"
import {connect} from "react-redux"

import {Text} from "pagination"
import {getContent,getContentClientBoundBox} from "state/selector"

const StateCursor=connect((state,{id:docId})=>{
	const {start:{id,at},end}=state.get("selection")
	if(id==0)
		return {height:0}
	if(end.id==id && end.at==at){
		let texts=document.querySelectorAll(`#${docId} svg text[data-content="${id}"][end]`)
		if(texts.length==0){
			console.warn(`can't find text[id=${id}]`)
			return {}
		}

		let {top,left,from}=getContentClientBoundBox(texts,at,id)
		const content=getContent(state, id).toJS()
		const text=content.children
		let wordwrapper=new Text.WordWrapper(content.props)
		let contentWidth=wordwrapper.stringWidth(text.substring(from,at))
		let {height, descent}=wordwrapper
		left+=contentWidth
		return {left, top, height, color:content.props.color}
	}else
		return {height:0}
})(Cursor)
