import React, {PropTypes} from "react"
import ReactDOM from "react-dom"
import {createStore, compose, applyMiddleware, combineReducers} from "redux"
import {Provider, connect} from "react-redux"

import {Document} from "../content"
import editable from "./editable"
import * as Cursor from "./cursor"
import * as Selection from "./selection"

const Super=editable(Document)

const composeEnhancers=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const ACTION={
	SET: content=>({type:"content.set",payload:content})
}

const reducer=(state={}, {type,payload})=>{
	switch(type){
	case "content.set":
		return payload	
	}
	return state
}

export default class EditableDocument extends Super{
	constructor(){
		super(...arguments)

		this.store=createStore(
			({content,selection, cursor, ...others},action)=>Object.assign(others, combineReducers({
					content:reducer
					,selection:Selection.reducer
					,cursor: Cursor.reducer
			})({content,selection,cursor},action))
			,{
				style:{}
				,setting:{}
			}
			,composeEnhancers())
	}
	
	more(){
		return [<Cursor.Cursor key="cursor"/>, <Selection.Selection key="selection"/>]
	}
	
	render(){
		return (
			<Provider store={this.store}>
			{super.render()}
			</Provider>
		)
	}

	componentDidMount(){
		super.componentDidMount()
		
		this.inputReady()

		this.cursorReady()
	}
	

	inputReady(){
		document.addEventListener("keydown",e=>{
			switch(e.keyCode){
			case 8:
				e.preventDefault()
				this.refs.cursor.backspace()
			break
			case 32:
				e.preventDefault()
				this.refs.cursor.insert(String.fromCharCode(e.keyCode))
			break
			}
		})

		document.addEventListener("keypress",e=>{
			this.refs.cursor.insert(String.fromCharCode(e.keyCode))
		})
	}

	cursorReady(){
		const root=this.refs.svg
		root.addEventListener("click", e=>{
			const target=e.target
			switch(target.nodeName){
			case 'text':
				let text=target.textContent
				let contentEndIndex=target.getAttribute("end")
				let contentID=target.getAttribute("data-content")
				let [x]=offset(e, target)
				let {top, left}=getClientBoundBox(target)
				this.store.dispatch(Cursor.ACTION.AT(contentID,contentEndIndex-text.length, x, top,left))
			break
			case 'image':
			break
			}
		})
		
		
	}

	on1ChildComposed(child){
		if(!this.computed.children.includes(child))
			super.on1ChildComposed(child)
	}
}
