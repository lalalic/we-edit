import React, {PureComponent, Component, PropTypes} from "react"
import Base from "../document"
import {Text} from "model/pagination"
import {ACTION} from "state"
import {getContent,getContentStyle,getSelection} from "state/selector"
import {editable} from "model/edit"
import recomposable from "./recomposable"

import Selection from "state/selection"
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
			store: PropTypes.any,
			getCursorInput: PropTypes.func
		}

		render(){
			return (
				<div ref={a=>this.root=a}>
					<Base.Composed {...this.props}>
						<Cursor
							getWordWrapper={style=>new Text.WordWrapper(style)}
							getRatio={()=>this.ratio}/>

						<Selection getRange={this.getRange.bind(this)}/>
					</Base.Composed>
				</div>
			)
		}

		getRange(start,end){
			let docId=this.context.docId
			let ratio=this.ratio
			let state=this.context.store.getState()
			const x=(node,id,at)=>{
				let left=node.getBoundingClientRect().left
				let style=getContentStyle(state,docId,id)
				let text=node.textContent
				let from=node.dataset.endAt-text.length

				let wordwrapper=new Text.WordWrapper(style)
				let width=wordwrapper.stringWidth(text.substring(0,at-from))
				if(ratio)
					width=width/ratio
				return left+width
			}

			let firstNode=getNode(docId, start.id, start.at)
			let lastNode=getNode(docId, end.id, end.at)

			const line=n=>{
				while(n.getAttribute("class")!="line")
				 	n=n.parentNode
				return n
			}
			let firstLine=line(firstNode)
			let lastLine=line(lastNode)
			while(firstLine.parentNode!=lastLine.parentNode){
				firstLine=firstLine.parentNode
				lastLine=lastLine.parentNode
			}

			if(firstLine==lastLine){
				let x0=x(firstNode,start.id,start.at)
				let x1=x(lastNode, end.id, end.at)
				let {top,height}=firstLine.getBoundingClientRect()
				return `M${x0} ${top} L${x1} ${top} L${x1} ${top+height} L${x0} ${top+height} L${x0} ${top}`
			}else{
				let all=firstLine.parentNode.children
				const indexOf=(aa,a)=>{
					for(let i=0,len=aa.length;i<len;i++)
						if(aa[i]==a)
							return i
					return -1
				}

				let lines=[]
				for(let i=indexOf(all,firstLine),l=indexOf(all,lastLine);i<=l;i++){
					lines.push(all[i])
				}

				let {path,l}=lines.reduce((route, l, i)=>{
					let {left,top,height,width}=l.getBoundingClientRect()
					let t
					switch(i){
					case 0:
						t=x(firstNode,start.id, start.at)
						route.path.push(`M${t} ${top}`)
						route.path.push(`L${left+width} ${top} L${left+width} ${top+height}`)
						route.l.unshift(`L${t} ${top+height} L${t} ${top}`)
					break
					case lines.length-1:
						t=x(lastNode,end.id, end.at)
						route.path.push(`L${t} ${top} L${t} ${top+height}`)
						route.l.unshift(`L${left} ${top+height} L${left} ${top}`)
					break
					default:
						route.path.push(`L${left+width} ${top} L${left+width} ${top+height}`)
						route.l.unshift(`L${left} ${top+height} L${left} ${top}`)
					break
					}

					return route
				},{path:[],l:[]})

				path.splice(path.length,0,...l)
				return path.join(" ")
			}
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
							if(current.getBoundingClientRect().top<target.getBoundingClientRect().top){
								dispatch(ACTION.Selection.END_AT(contentID,from+end))
							}else{
								dispatch(ACTION.Selection.START_AT(contentID,from+end))
							}
						}
					}else
						dispatch(ACTION.Cursor.AT(contentID,from+end))
				break
				}

				active()

			})

			svg.addEventListener("mouseup",e=>{
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
					firstLine=firstLine.getBoundingClientRect()

					let last=selection.focusNode
					last=last.parentNode//text
					let lastId=last.dataset.content
					let lastAt=last.dataset.endAt-last.textContent.length+selection.focusOffset
					let lastLine=line(last)
					lastLine=lastLine.getBoundingClientRect()

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
						firstLast()
					}else if(firstLine.top<lastLine.top){
						lastFirst()
					}else{
						if(first!=last){
							if(first.getBoundingClientRect().left<last.getBoundingClientRect().left){
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
		let end=parseInt(a.dataset.endAt)
		let length=a.textContent.length
		let start=end-length
		if(start<=at && at<=end)
			return a
	}
}
