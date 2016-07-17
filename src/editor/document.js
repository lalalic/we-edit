import React, {PropTypes} from "react"
import ReactDOM from "react-dom"

import {Document} from "../content"
import editable from "./editable"
import Cursor from "./cursor"

let Super=editable(Document)
export default class extends Super{
	more(){
		return <Cursor ref="cursor"/>
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
			default:
				this.refs.cursor.insert(String.fromCharCode(e.keyCode))
			}
		})
	}

	focusCursor(){
		let firstText=ReactDOM.findDOMNode(this).querySelector('svg text')
		if(!firstText) return
		let event = document.createEvent("SVGEvents")
		event.initEvent("click",true,true)
		firstText.dispatchEvent(event)
	}

	on1ChildComposed(child){
		if(!this.computed.children.includes(child))
			super.on1ChildComposed(child)
	}
}
