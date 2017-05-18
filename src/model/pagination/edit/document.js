import React, {PureComponent, Component, PropTypes} from "react"
import {connect} from "react-redux"
import Waypoint from "react-waypoint"

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

const Super=editable(recomposable(Base))

let UUID=0

export default class Document extends Super{
	static contextTypes={
		...Super.contextTypes,
		viewport:PropTypes.any,
		media: PropTypes.string,
		isContentChanged: PropTypes.func
	}

	static childContextTypes={
		...Super.childContextTypes,
		shouldContinueCompose: PropTypes.func,
		shouldRemoveComposed: PropTypes.func
	}

	state={compose2Page:1}

	getChildContext(){
		let shouldRemoveComposed=this.shouldRemoveComposed.bind(this)
		let shouldContinueCompose=this.shouldContinueCompose.bind(this)
		return {
			...super.getChildContext(),
			shouldContinueCompose,
			shouldRemoveComposed
		}
	}

	render(){
		const {mode}=this.state
		let props={}
		if(mode=="content")
			props.minHeight=this.canvas.getClientRect().height
		
        return (
			<div>
				<div style={{display:"none"}}>
				{this.props.children}
				</div>
				<this.constructor.Composed ref={a=>this.canvas=a}
					{...props}
					width={this.contentWidth}
					pages={this.computed.composed}
					isAllComposed={()=>this.computed.children.length==this.props.children.length}
					composeMore={e=>this.composeMore()}
					/>
			</div>
		)
    }

	composeMore(){
		this.setState(p=>({compose2Page:p.compose2Page+1,mode:"performant"}))
	}

	componentWillReceiveProps(){
		super.componentWillReceiveProps(...arguments)
		this.setState({mode:"content"})
	}

	shouldRemoveComposed(){
		return this.state.mode=="content"
	}
	
	get contentHeight(){
		//return this.computed.composed.reduce((w,{size:{height}})=>w+height,0)
		let last=this.computed.composed.pop()
		let height=this.computed.composed.reduce((w,{size:{height}})=>w+height,0)
		if(last){
			this.computed.composed.push(last)
			let lastColumnLines=last.columns[last.columns.length-1].children
			let lastLine=lastColumnLines[lastColumnLines.length-1]
			height+=last.margin.top
			if(lastLine)
				height+=(lastLine.props.y+lastLine.props.height)
		}
		return height
	}

	shouldContinueCompose(){
		const {media,viewport}=this.context
		const {compose2Page,mode}=this.state
		
		if(media=="screen"){
			if(this.contentHeight>viewport.height){
				switch(mode){
				case "content":
					return this.contentHeight<(screen.height-this.canvas.getClientRect().top)
				case "performant":
				default:
					return this.computed.composed.length<compose2Page+1
				}
			}else
				return true
		}else
			return true
	}


	static Composed=class extends Component{
		static displayName="composed-document-with-flasher"
		static contextTypes={
			docId: PropTypes.string,
			store: PropTypes.any,
			getCursorInput: PropTypes.func,
			pgGap: PropTypes.number
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
			const {isAllComposed, composeMore, pages, ...props}=this.props
			let composeMoreTrigger=null
			if(!isAllComposed()){
				let y=pages.reduce((h,{size:{height}})=>h+height,0)
						+(pages.length-2)*this.context.pgGap
						-pages[pages.length-1].size.height

				composeMoreTrigger=(
					<Waypoint key={UUID++} onEnter={e=>composeMore()}>
						<g transform={`translate(0 ${y})`}/>
					</Waypoint>
				)
			}else{
				delete props.minHeight
			}
				

			let selection=getSelection(this.context.store.getState())
			let {end,start,active,cursorAt}=selection
			let {id,at}=selection[cursorAt]

			return (
				<div ref={a=>this.root=a}>
					<Base.Composed {...props} pages={pages}
						onPageHide={e=>this.updateCursorAndSelection()}
						onPageShow={e=>this.updateCursorAndSelection()}>
						{composeMoreTrigger}

						<SelectionState>
							<Cursor {...{id,at,active}} ref={a=>this.cursor=a}/>
						</SelectionState>
					</Base.Composed>
				</div>
			)
		}

		componentDidUpdate(){
			this.updateCursorAndSelection()
		}

		componentDidMount(){
			let svg=this.root.querySelector("svg")
			let width=svg.getAttribute("width")
			let [,,viewBoxWidth]=svg.getAttribute("viewBox").split(" ")
			this.ratio=viewBoxWidth/width

			this.context.store.dispatch(ACTION.Cursor.ACTIVE(this.context.docId))

			svg.addEventListener("click", this.onClick.bind(this))

			svg.addEventListener("mouseup", this.onSelect.bind(this))
			
			this.getClientRect=()=>svg.getBoundingClientRect()
		}

		updateCursorAndSelection(){
			this.cursor.forceUpdate()
			//this.selection.foreceUpdate()
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

let lastContent=null
const SelectionState=connect(state=>{
	let selection=getSelection(state)
	let content=state.get("content")
	let {end,start,active,cursorAt}=selection
	let {id,at}=selection[cursorAt]
	let contentChanged=!!(lastContent && lastContent!==content)
	lastContent=content
	return {id,at,active, contentChanged}
})(
class extends Component{
	render(){
		const {children,id,at,active,contentChanged}=this.props
		return React.cloneElement(children,{id,at,active,contentChanged})
	}
})
