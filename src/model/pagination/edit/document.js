import React, {PureComponent, Component, PropTypes} from "react"
import Base from "../document"
import {Text} from "model/pagination"
import {ACTION} from "state"
import {getContent,getContentStyle} from "state/selector"
import {editable} from "model/edit"
import recomposable from "./recomposable"

import Cursor from "state/cursor"
import offset from "mouse-event-offset"

export default class Document extends editable(recomposable(Base)){
	_reComposeFrom(section){
		let index=this.computed.children.findIndex(a=>a==section)
		this.computed.children.splice(index,1)
	}

	static Composed=class extends Component{
		static displayName="composed-document-with-flasher"
		static contextTypes={
			docId: PropTypes.string,
			store: PropTypes.any
		}

		render(){
			return (
				<div ref={a=>this.root=a}>
					<Base.Composed {...this.props}>
						<Cursor ref={a=>this.cursor=a} positioning={this.cursorPosition.bind(this)}/>
					</Base.Composed>
				</div>
			)
		}
		
		cursorPosition(id, at, text, style){
			let texts=document.querySelectorAll(`#${this.context.docId} svg text[data-content="${id}"]`)
			if(texts.length==0)
				return null

			let {top,left,from}=getContentClientBoundBox(texts,at,id)
			let wordwrapper=new Text.WordWrapper(style)
			let width=wordwrapper.stringWidth(text.substring(from,at))
			let {height, descent}=wordwrapper
			return {top, left, width, height, descent}
		}
		
		componentDidMount(){
			this.root.querySelector("svg").addEventListener("click", e=>{
				const target=e.target
				switch(target.nodeName){
				case 'text':
					let text=target.textContent
					let contentEndIndex=target.getAttribute("data-endAt")
					let from=contentEndIndex-text.length

					let contentID=target.getAttribute("data-content")
					let [x]=offset(e, target)
					
					let dispatch=this.context.store.dispatch
					const state=this.context.store.getState()
					const content=getContent(state, contentID).toJS()
					const style=getContentStyle(state,this.context.docId, contentID)
					const wordwrapper=new Text.WordWrapper(style)
					const end=wordwrapper.widthString(x, content.children.substr(from))
					dispatch(ACTION.Cursor.AT(contentID,from+end))
					dispatch(ACTION.Cursor.ACTIVE(this.context.docId))
				break
				}
			})
			this.context.store.dispatch(ACTION.Cursor.ACTIVE(this.context.docId))
		}
	}
}

function getContentClientBoundBox(texts, at, id){
	let found, from
	for(let i=0, len=texts.length; i<len; i++){
		let a=texts[i]
		let end=parseInt(a.getAttribute('data-endAt'))
		let length=a.textContent.length
		let start=end-length
		if(start<=at && at<end){
			found=a
			from=start
			break
		}
	}

	if(!found){
		console.warn(`can't found text(${id},${at})`)
		return {top:0,left:0,from:0}
	}
	let {top,left}=found.getBoundingClientRect()
	return {top,left,from}
}
