import React, {PropTypes} from "react"
import Cursor from "./base"
import {WordWrapper} from "wordwrap"

export class HtmlCursor extends Cursor{
	render(){
		const {left, top, height, color, size}=this.state
		const style={margin:0,padding:0,border:0,position:"absolute"}

		return (
			<div unselectable="on" ref={a=>this.root=a}
				style={{...style,left,top,height,width:size}}/>
		)
	}

	info(docId, id, at, text, style){
		let node=document.querySelector(`#${docId} span[data-content="${id}"]`)
		if(!node)
			return null

		let {top,left}=node.getBoundingClientRect()
		let wordwrapper=new this.constructor.HtmlWrapper(node)
		
		let width=wordwrapper.stringWidth(text.substring(0,at))
		let {height, descent}=wordwrapper
		wordwrapper.close()
		return {top, left, width,height,descent}
	}

	toggle(){
		let color=this.root.style.background
		this.root.style.background=color=="transparent" ? this.state.color : "transparent"
	}

	static HtmlWrapper=class{
		constructor(node){
			this.node=node
			this.tester=node.cloneNode(false)
			this.tester.innerHTML="M"
			this.tester.style="position:absolute;left:-999;top:0;"
			node.parentNode.appendChild(this.tester)
			this.height=this.tester.getBoundingClientRect().height
			this.descent=0
		}

		stringWidth(word){
	        this.tester.innerHTML=word
	        return this.tester.getBoundingClientRect().width
	    }

		widthString(width,text){
			return WordWrapper.prototype.widthString.apply(this,arguments)
		}

		close(){
			this.tester.parentNode.removeChild(this.tester)
		}
	}
}



export default HtmlCursor.connect()
