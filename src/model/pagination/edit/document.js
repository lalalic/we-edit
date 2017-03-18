import React from "react"
import Base from "../document"

import {ACTION,Cursor,Selection} from "state"

import {editable} from "model/edit"
import recomposable from "./recomposable"

import uuid from "tools/uuid"

export default class Document extends editable(recomposable(Base)){
	uuid=`doc${uuid()}`
	render(){
        return (
			<div ref="main" id={this.uuid}>
				<Selection id={this.uuid}/>
				<StateCursor id={this.uuid}/>
				{super.render()}
			</div>
		)
    }

	componentDidMount(){
		if(super.componentDidMount)
			super.componentDidMount()
		this.cursorReady()
		this.inputReady()
	}

	get root(){
		return this.refs.main.querySelector("svg")
	}


	inputReady(){
		document.addEventListener("keydown",e=>{
			switch(e.keyCode){
			case 8://backspace
				e.preventDefault()
				this.store.dispatch(ACTION.Text.REMOVE(1))
			break
			case 32://space
				e.preventDefault()
				this.store.dispatch(ACTION.Text.INSERT(String.fromCharCode(e.keyCode)))
			break
			case 37://ARROW LEFT
				e.preventDefault()
				this.store.dispatch(ACTION.Selection.MOVE_LEFT())
			break
			case 38://ARROW UP
				e.preventDefault()
				this.store.dispatch(ACTION.Selection.MOVE_UP())
			break
			case 39://ARROW RIGHT
				e.preventDefault()
				this.store.dispatch(ACTION.Selection.MOVE_RIGHT())
			break
			case 40://ARROW DOWN
				e.preventDefault()
				this.store.dispatch(ACTION.Selection.MOVE_DOWN())
			break
			}
		})

		document.addEventListener("keypress",e=>{
			this.props.dispatch(ACTION.Text.INSERT(String.fromCharCode(e.keyCode)))
		})
	}

	cursorReady(){
		let firstText=this.root.querySelector("text[data-content]").getAttribute("data-content")
		debugger
		this.props.dispatch(ACTION.Selection.SELECT(firstText,0))
		this.root.addEventListener("click", e=>{
			const target=e.target
			switch(target.nodeName){
			case 'text':
				let text=target.textContent
				let contentEndIndex=target.getAttribute("end")
				let contentID=target.getAttribute("data-content")
				let [x]=offset(e, target)
				this.props.dispatch(ACTION.Cursor.AT(contentID,contentEndIndex-text.length, x))
			break
			}
		})

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
