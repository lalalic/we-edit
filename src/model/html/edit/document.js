import React, {PropTypes} from "react"
import Base from "../document"

import {ACTION} from "state"
import {editable} from "model/edit"
import Cursor from "state/cursor"
import {getContent} from "state/selector"
import offset from "mouse-event-offset"

export default class Document extends editable(Base){
	static contextTypes={
		store:PropTypes.any,
		docId:PropTypes.any
	}

	render(){
        return (
			<div ref={a=>this.root=a}>
				{super.render()}
				<Cursor positioning={this.cursorPosition.bind(this)}/>
			</div>
		)
    }

	componentDidMount(){
		this.root.addEventListener("click", e=>{
			const target=e.target
			switch(target.nodeName.toLowerCase()){
			case 'span':
				let contentID=target.getAttribute("data-content")
				console.assert(!!contentID)
				let [x]=offset(e, target)

				let dispatch=this.context.store.dispatch
				const content=getContent(this.context.store.getState(), contentID).toJS()

				let wrapper=new HtmlWrapper(target)
				let end=wrapper.widthString(x,content.children)
				wrapper.close()

				dispatch(ACTION.Cursor.AT(contentID,end))
				dispatch(ACTION.Cursor.ACTIVE(this.context.docId))
			break
			}
		})
		this.context.store.dispatch(ACTION.Cursor.ACTIVE(this.context.docId))
	}

	cursorPosition(id, at, text, style){
		let node=document.querySelector(`#${this.context.docId} span[data-content="${id}"]`)
		if(!node)
			return null

		let {top,left}=node.getBoundingClientRect()
		let wordwrapper=new HtmlWrapper(node)
		
		let width=wordwrapper.stringWidth(text.substring(0,at))
		let {height, descent}=wordwrapper
		wordwrapper.close()
		return {top, left, width,height,descent}
	}
}


import {WordWrapper} from "wordwrap"

class HtmlWrapper{
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
