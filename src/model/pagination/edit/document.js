import React, {PureComponent, Component, PropTypes} from "react"
import Base from "../document"
import {Text} from "model/pagination"
import {ACTION} from "state"
import {getContent,getContentStyle,getSelection} from "state/selector"
import {editable} from "model/edit"
import recomposable from "./recomposable"

import Cursor from "state/cursor"
import offset from "mouse-event-offset"

import get from "lodash.get"

export default class Document extends editable(recomposable(Base)){
	_reComposeFrom(section){
		let index=this.computed.children.findIndex(a=>a==section)
		this.computed.children.splice(index,1)
	}

	static Composed=class extends Component{
		static displayName="composed-document-with-flasher"
		static contextTypes={
			docId: PropTypes.string,
			store: PropTypes.any,
			getCursorInput: PropTypes.func
		}

		render(){
			return (
				<div ref={a=>this.root=a}>
					<Base.Composed {...this.props}>
						<Cursor ref={a=>this.cursor=a}
							positioning={this.cursorPosition.bind(this)}
							getRange={this.getRange.bind(this)}
							/>
					</Base.Composed>
				</div>
			)
		}

		getRange(start,end){
			let docId=this.context.docId
			let firstNode=getNode(docId, start.id, start.at)
			let lastNode=getNode(docId, end.id, end.at)
			let range=document.createRange()
			range.setStart(firstNode.firstChild, start.at-(firstNode.getAttribute("data-endAt")-firstNode.textContent.length))
			range.setEnd(lastNode.firstChild, end.at-(lastNode.getAttribute("data-endAt")-lastNode.textContent.length))
			return range
		}

		cursorPosition(id, at, text, style){
			let node=getNode(this.context.docId, id, at)
			let {top,left}=node.getBoundingClientRect()
			let from=node.getAttribute("data-endAt")-node.textContent.length
			top+=window.scrollY
			left+=window.scrollX


			let wordwrapper=new Text.WordWrapper(style)
			let width=wordwrapper.stringWidth(text.substring(from,at))
			let {height, descent}=wordwrapper
			if(this.ratio){
				width=width/this.ratio
				height=height/this.ratio
				descent=descent/this.ratio
			}

			const downUp=a=>(bEnd)=>{
				let current=node, target
				while(current.getAttribute("class")!=="line")
					current=current.parentNode
				let {height}=current.getBoundingClientRect()
				let next=get(current,`parentNode.${a}Sibling.firstChild`)
				if(!next)
					return
				const dispatch=this.context.store.dispatch

				let y=top+height+next.getBoundingClientRect().height/2
				let x=left+width
				let pots=next.querySelectorAll("text")
				for(let i=0,len=pots.length;i<len;i++){
					let {left:l,width:w}=pots[i].getBoundingClientRect()
					if(l<=x && x<=l+w){
						target=pots[i]
						let wrapper=new Text.WordWrapper(getContentStyle(this.context.store.getState(), this.context.docId, target.getAttribute("data-content")))
						let end=wrapper.widthString((x-l)*this.ratio, target.textContent)
						end+=target.getAttribute("data-endAt")-target.textContent.length
						if(!bEnd)
							dispatch(ACTION.Cursor.AT(target.getAttribute("data-content"),end))
						else
							dispatch(ACTION.Selection.END_AT(target.getAttribute("data-content"),end))
						return
					}
				}

				target=pots[pots.length-1]
				if(!bEnd)
					dispatch(ACTION.Cursor.AT(target.getAttribute("data-content"), parseInt(target.getAttribute("data-endAt"))))
				else
					dispatch(ACTION.Selection.END_AT(target.getAttribute("data-content"), parseInt(target.getAttribute("data-endAt"))))
			}
			return {top, left, width, height, descent,up:downUp("previous"),down:downUp("next")}
		}

		componentDidMount(){
			let svg=this.root.querySelector("svg")
			let width=svg.getAttribute("width")
			let [,,viewBoxWidth]=svg.getAttribute("viewBox").split(" ")
			this.ratio=viewBoxWidth/width

			let dispatch=this.context.store.dispatch
			dispatch(ACTION.Cursor.ACTIVE(this.context.docId))

			let docId=this.context.docId

			const active=()=>{
				let {active}=getSelection(this.context.store.getState())
				if(active!=docId)
					dispatch(ACTION.Cursor.ACTIVE(docId))
				else
					this.context.getCursorInput().forceUpdate()
			}

			svg.addEventListener("click", e=>{
				const target=e.target
				switch(target.nodeName){
				case 'text':
					let text=target.textContent
					let contentEndIndex=target.getAttribute("data-endAt")
					let from=contentEndIndex-text.length

					let contentID=target.getAttribute("data-content")
					let [x]=offset(e, target)
					x=x*this.ratio

					const state=this.context.store.getState()
					const content=getContent(state, contentID).toJS()
					const style=getContentStyle(state,docId, contentID)
					const wordwrapper=new Text.WordWrapper(style)
					const end=wordwrapper.widthString(x, content.children.substr(from))
					dispatch(ACTION.Cursor.AT(contentID,from+end))
				break
				}

				active()

			})

			svg.addEventListener("mouseup",e=>{
				let selection=window.getSelection()||document.getSelection()
				if(selection.type=="Range"){
					let first=selection.anchorNode
					first=first.parentNode

					let last=selection.focusNode
					last=last.parentNode

					dispatch(ACTION.Selection.SELECT(
							first.getAttribute("data-content"),
							first.getAttribute("data-endAt")-first.textContent.length+selection.anchorOffset,
							last.getAttribute("data-content"),
							last.getAttribute("data-endAt")-last.textContent.length+selection.focusOffset
						))
				}
				active()
			})

			svg.addEventListener("keydown", e=>{
				console.log("keydown on svg")
				return
				let sel=window.getSelection()
				if(sel.type=="Range")
					active()
			})
		}
	}
}

function getNode(docId, id, at){
	let nodes=document.querySelectorAll(`#${docId} svg [data-content="${id}"]`)
	if(nodes.length==1)
		return nodes[0]

	for(let i=0, len=nodes.length; i<len; i++){
		let a=nodes[i]
		let end=parseInt(a.getAttribute('data-endAt'))
		let length=a.textContent.length
		let start=end-length
		if(start<=at && at<=end)
			return a
	}
}
