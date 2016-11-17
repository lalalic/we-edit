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

		this.store=createStore(combineReducers({
				content:reducer
				,selection:Selection.reducer
			}), {
				content:{}
				,style:{}
				,setting:{}
				,selection:{
					start:{
						id:0
						,at:0
					}
					,end:{
						id:0
						,at:0
					}
				}
			}, composeEnhancers())
		
		const content=this.extractContent()
		
		this.store.dispatch(ACTION.SET(content))
	}
	
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
	
	extractContent(){
		const extract=element=>{
			const {children, ...others}=element
			others.type=""
			others.content=React.Children.map(children, extract)
			return others
		}
		
		const {children, ...others}=this.props
		
		others.content=React.Children.map(children, extract)
		return others
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
