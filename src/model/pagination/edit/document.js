import React, {PureComponent, Component, PropTypes} from "react"
import Base from "../document"
import {Text} from "model/pagination"
import {ACTION} from "state"
import {getContent,getContentStyle,getSelection,getNode} from "state/selector"
import {editable} from "model/edit"
import recomposable from "./recomposable"

import Selection from "./selection"
import Cursor from "state/cursor"

import offset from "mouse-event-offset"
import getClientRect from "tools/get-client-rect"

export default class Document extends editable(recomposable(Base)){

	static Composed=class extends Component{
		static displayName="composed-document-with-flasher"
		static contextTypes={
			docId: PropTypes.string,
			store: PropTypes.any,
			getCursorInput: PropTypes.func
		}

		static childContextTypes={
			getRatio: PropTypes.func,
			getWordWrapper:PropTypes.func
		}

		getChildContext(){
			let self=this
			return {
				getRatio(){
					return self.ratio
				},
				getWordWrapper(style){
					return new Text.WordWrapper(style)
				}
			}
		}

		render(){
			return (
				<div ref={a=>this.root=a}>
					<Base.Composed {...this.props}>
						<Cursor/>
						<Selection/>
					</Base.Composed>
				</div>
			)
		}

		componentDidMount(){
			let svg=this.root.querySelector("svg")
			let width=svg.getAttribute("width")
			let [,,viewBoxWidth]=svg.getAttribute("viewBox").split(" ")
			this.ratio=viewBoxWidth/width

			this.context.store.dispatch(ACTION.Cursor.ACTIVE(this.context.docId))

			svg.addEventListener("click", this.onClick.bind(this))

			svg.addEventListener("mouseup", this.onSelect.bind(this))
		}

		active(){
			let {docId, store}=this.context
			let {active}=getSelection(store.getState())
			if(active!=docId)
				store.dispatch(ACTION.Cursor.ACTIVE(docId))
			else
				this.context.getCursorInput().forceUpdate()
		}

		onClick(e){
			const dispatch=this.context.store.dispatch
			const docId=this.context.docId
			const target=e.target

			switch(target.nodeName){
			case 'text':
				let text=target.textContent
				let {endAt:contentEndIndex, content:contentID}=target.dataset
				let from=contentEndIndex-text.length

				let [x]=offset(e, target)
				x=x*this.ratio

				const state=this.context.store.getState()
				const content=getContent(state, contentID).toJS()
				const style=getContentStyle(state,docId, contentID)
				const wordwrapper=new Text.WordWrapper(style)
				const end=wordwrapper.widthString(x, content.children.substr(from))
				if(e.shiftKey){
					let {end:{id,at}}=getSelection(state)
					if(id==contentID){
						if(at<from+end){
							dispatch(ACTION.Selection.END_AT(contentID,from+end))
						}else{
							dispatch(ACTION.Selection.START_AT(contentID,from+end))
						}
					}else{
						let current=getNode(docId,id,at)
						if(getClientRect(current).top<getClientRect(target).top){
							dispatch(ACTION.Selection.END_AT(contentID,from+end))
						}else{
							dispatch(ACTION.Selection.START_AT(contentID,from+end))
						}
					}
				}else
					dispatch(ACTION.Cursor.AT(contentID,from+end))
			break
			}

			this.active()
		}

		onSelect(e){
			const dispatch=this.context.store.dispatch
			const docId=this.context.docId

			let selection=window.getSelection()||document.getSelection()
			if(selection.type=="Range"){
				const line=n=>{
					while(n.getAttribute("class")!="line")
						n=n.parentNode
					return n
				}

				let first=selection.anchorNode
				first=first.parentNode//text
				let firstId=first.dataset.content
				let firstAt=first.dataset.endAt-first.textContent.length+selection.anchorOffset
				let firstLine=line(first)
				firstLine=getClientRect(firstLine)

				let last=selection.focusNode
				last=last.parentNode//text
				let lastId=last.dataset.content
				let lastAt=last.dataset.endAt-last.textContent.length+selection.focusOffset
				let lastLine=line(last)
				lastLine=getClientRect(lastLine)

				const firstLast=a=>{
					dispatch(ACTION.Selection.SELECT(
							firstId,
							firstAt,
							lastId,
							lastAt
						))
					dispatch(ACTION.Selection.END_AT(lastId,lastAt))
				}

				const lastFirst=a=>{
					dispatch(ACTION.Selection.SELECT(
							lastId,
							lastAt,
							firstId,
							firstAt
						))
					dispatch(ACTION.Selection.START_AT(lastId,lastAt))
				}

				if(firstLine.top>lastLine.top){
					lastFirst()
				}else if(firstLine.top<lastLine.top){
					firstLast()
				}else{
					if(first!=last){
						if(getClientRect(first).left<getClientRect(last).left){
							firstLast()
						}else{
							lastFirst()
						}
					}else{
						if(firstAt<lastAt){
							firstLast()
						}else{
							lastFirst()
						}
					}
				}
			}
			this.active()
		}
	}
}
