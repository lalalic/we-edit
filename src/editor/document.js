import React, {PropTypes} from "react"
import ReactDOM from "react-dom"
import {createStore, compose, applyMiddleware, combineReducers} from "redux"
import {Provider, connect} from "react-redux"
import offset from "mouse-event-offset"
import thunk from "redux-thunk"

import {Document} from "../content"
import editable from "./editable"
import {ACTION as Text_ACTION} from "./text"
import Cursor, {ACTION as Cursor_ACTION} from "./cursor"
import Selection, {ACTION as Selection_ACTION, reducer as Selection_reducer} from "./selection"

const Super=editable(Document)

const composeEnhancers=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default class EditableDocument extends Super{
	constructor(){
		super(...arguments)

		this.store=createStore(
			({selection, ...others},action)=>Object.assign(others, combineReducers({
					selection:Selection_reducer
			})({selection},action))
			,{
				style:{}
				,setting:{}
			}
			,composeEnhancers(applyMiddleware(thunk)))
	}

	more(){
		return [<Cursor key="cursor"/>, <Selection key="selection"/>]
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
				this.store.dispatch(Text_ACTION.REMOVE(-1))
			break
			case 32:
				e.preventDefault()
				this.store.dispatch(Text_ACTION.INSERT(String.fromCharCode(e.keyCode)))
			break
			}
		})

		document.addEventListener("keypress",e=>{
			this.store.dispatch(Text_ACTION.INSERT(String.fromCharCode(e.keyCode)))
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
				this.store.dispatch(Cursor_ACTION.AT(contentID,contentEndIndex-text.length, x))
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
