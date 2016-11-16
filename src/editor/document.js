import React, {PropTypes} from "react"
import ReactDOM from "react-dom"
import {createStore, compose, applyMiddleware, combineReducers} from "redux"
import {Provider, connect} from "react-redux"

import {Document} from "../content"
import editable from "./editable"
import Cursor from "./cursor"
import * as Selection from "./selection"

const Super=editable(Document)

const composeEnhancers=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default class extends Super{
	store=createStore(combineReducers({selection:Selection.reducer}), {}, composeEnhancers())
	
	more(){
		return <Cursor ref="cursor"/>
	}
	
	render(){
		return (
			<Provider store={this.store}>
			{super.render()}
			</Provider>
		)
	}


	static childContextTypes=Object.assign({
		cursor: PropTypes.func
	},Super.childContextTypes)

	getChildContext(){
		var self=this
		return Object.assign(super.getChildContext(),{
			cursor(){
				return self.refs.cursor
			}
		})
	}

	componentDidMount(){
		super.componentDidMount()

		this.inputReady()

		this.focusCursor()
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

	focusCursor(){
		let firstText=ReactDOM.findDOMNode(this).querySelector('svg .content text')
		if(firstText){
			let event = document.createEvent("SVGEvents")
			event.initEvent("click",true,true)
			firstText.dispatchEvent(event)
		}
	}

	on1ChildComposed(child){
		if(!this.computed.children.includes(child))
			super.on1ChildComposed(child)
	}
}
