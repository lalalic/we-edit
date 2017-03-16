import React from "react"
import offset from "mouse-event-offset"

import Base from "../document"
import Cursor from "./cursor"
import Selection from "./selection"

import Composed from "composed/document"

import {ACTION} from "state/action"

import {editable} from "model/edit"
import recomposable from "./recomposable"

export default class Document extends editable(recomposable(Base)){
	render(){
        return (
			<div>
				<div style={{display:"none"}}>
				{this.props.children}
				</div>
				<div ref="composed">
					<Composed sections={this.computed.children}>
						<Cursor/>
						<Selection/>
					</Composed>
				</div>
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
		return this.refs.composed.querySelector("svg")
	}
	
	
	inputReady(){
		document.addEventListener("keydown",e=>{
			switch(e.keyCode){
			case 8://backspace
				e.preventDefault()
				this.store.dispatch(Text_ACTION.REMOVE(1))
			break
			case 32://space
				e.preventDefault()
				this.store.dispatch(Text_ACTION.INSERT(String.fromCharCode(e.keyCode)))
			break
			case 37://ARROW LEFT
				e.preventDefault()
				this.store.dispatch(Selection_ACTION.MOVE_LEFT())
			break
			case 38://ARROW UP
				e.preventDefault()
				this.store.dispatch(Selection_ACTION.MOVE_UP())
			break
			case 39://ARROW RIGHT
				e.preventDefault()
				this.store.dispatch(Selection_ACTION.MOVE_RIGHT())
			break
			case 40://ARROW DOWN
				e.preventDefault()
				this.store.dispatch(Selection_ACTION.MOVE_DOWN())
			break
			}
		})

		document.addEventListener("keypress",e=>{
			this.store.dispatch(Text_ACTION.INSERT(String.fromCharCode(e.keyCode)))
		})
	}

	cursorReady(){
		this.root.addEventListener("click", e=>{
			const target=e.target
			switch(target.nodeName){
			case 'text':
				let text=target.textContent
				let contentEndIndex=target.getAttribute("end")
				let contentID=target.getAttribute("data-content")
				let [x]=offset(e, target)
				this.store.dispatch(Cursor_ACTION.AT(contentID,contentEndIndex-text.length, x))
			break
			}
		})
	}
}