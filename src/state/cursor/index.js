import React, {PureComponent as Component, Children, PropTypes} from "react"
import {connect} from "react-redux"
import {getContent, getContentStyle, getSelection,getNode} from "state/selector"
import {ACTION} from "state"

import get from "lodash.get"
import getClientRect from "tools/get-client-rect"

export class Cursor extends Component{
	static contextTypes={
		store: PropTypes.any,
		docId: PropTypes.string,
		getCursorInput: PropTypes.func,
		getRatio: PropTypes.func,
		getWordWrapper: PropTypes.func,
		query: PropTypes.func
	}

	static propTypes={
		id: PropTypes.string,
		at: PropTypes.number,
		active: PropTypes.string,
		contentChanged: PropTypes.bool
	}

	render(){
		return null
	}

	shouldComponentUpdate({contentChanged}){
		return !contentChanged
	}

	componentDidUpdate(prevProps){
		const {active,id,at}=this.props
		const {docId, getCursorInput}=this.context
		this.node=getNode(docId,id, at)
		this.style=null
			
		if(!this.node){
			if(docId==active){
				getCursorInput()
				.setState({
					color:"transparent",
					inView:false
				})
			}
			return
		}

		switch(this.node.tagName){
		case "image":
			
			return
		break
		}
		this.style=this.position(docId,id,at)

		if(docId==active)
			getCursorInput()
			.setState({
				color:"black",
				...this.style,
				up:this.up.bind(this),
				down:this.down.bind(this)
			})
	}

	position(docId,id,at){
		const state=this.context.store.getState()
		const {children:text}=getContent(state, id).toJS()
		const style=getContentStyle(state, docId, id)

		let node=this.node
		let {top,left}=getClientRect(node)
		let from=node.dataset.endAt-node.textContent.length

		let wordwrapper=this.context.getWordWrapper(style)
		let width=wordwrapper.stringWidth(text.substring(from,at))
		let {height, descent}=wordwrapper
		
		let ratio=this.context.getRatio()
		if(ratio){
			width=width/ratio
			height=height/ratio
			descent=descent/ratio
		}
		left+=width
		
		if(text.length==0)//empty text
			top-=(height-descent)

		return {...style,left,top,height,width}
	}

	getLineNode(which,node){
		let current=node||this.node;

		while(current.getAttribute("class")!=="line")
			current=current.parentNode

		switch(which){
		case "next":
		case "previous":
			return get(current,`parentNode.${which}Sibling.firstChild`)
		default:
			return current
		}
	}

	getNextLine(direct){
		let current=this.getLineNode()
		let next=this.getLineNode(direct)

		const state=this.context.store.getState()

		let {left,top}=getClientRect(this.node)

		let {height}=getClientRect(current)
		let y=top+height+getClientRect(next).height/2
		let x=left+this.style.width
		let pots=next.querySelectorAll("text")
		let id,at,target
		for(let i=0,len=pots.length;i<len;i++){
			let {left:l,width:w}=getClientRect(pots[i])
			if(l<=x && x<=l+w){
				target=pots[i]
				id=target.dataset.content
				let text=target.textContent
				let wrapper=this.context.getWordWrapper(getContentStyle(state, this.context.docId, id))
				let ratio=this.context.getRatio()
				at=wrapper.widthString(Math.ceil((x-l)*ratio), text)
							+parseInt(target.dataset.endAt)
							-text.length
				break
			}
		}
		if(!id){
			target=pots[pots.length-1]
			id=target.dataset.content
			at=parseInt(target.dataset.endAt)
		}

		return {target,id,at,next}
	}

	up(shiftKey){
		const {docId,store}=this.context
		const dispatch=store.dispatch
		const state=store.getState()
		const {start,end,cursorAt}=getSelection(state)

		let {id,at,target,next}=this.getNextLine("previous")

		if(!shiftKey)
			dispatch(ACTION.Cursor.AT(id,at))
		else{
			if(start.id==end.id && start.at==end.at){
				dispatch(ACTION.Selection.START_AT(id,at))
			}else{
				if(cursorAt=="start")
					dispatch(ACTION.Selection.START_AT(id,at))
				else if(cursorAt=="end"){
					let startNode=getNode(docId, start.id,start.at)
					let startLine=this.getLineNode("",startNode)
					if(startLine.parentNode.previousSibling==next.parentNode ||
						(startLine==next &&
						(startNode==target && at<start.at) ||
						getClientRect(startNode).left>getClientRect(target).left
					)){
						dispatch(ACTION.Selection.SELECT(id,at,start.id,start.at))
						dispatch(ACTION.Selection.START_AT(id,at))
					}else{
						dispatch(ACTION.Selection.END_AT(id,at))
					}
				}
			}
		}
	}

	down(shiftKey){
		const {docId,store}=this.context
		const dispatch=store.dispatch
		const state=store.getState()
		const {start,end,cursorAt}=getSelection(state)

		let {id,at,target,next}=this.getNextLine("next")

		if(!shiftKey)
			dispatch(ACTION.Cursor.AT(id,at))
		else{
			if(start.id==end.id && start.at==end.at){
				dispatch(ACTION.Selection.END_AT(id,at))
			}else{
				if(cursorAt=="end")
					dispatch(ACTION.Selection.END_AT(id,at))
				else if(cursorAt=="start"){
					let endNode=getNode(docId, end.id,end.at)
					let endLine=this.getLineNode("",endNode)
					if(endLine.parentNode.nextSibling==next.parentNode ||
						(endLine==next &&
						(endNode==target && at>end.at) ||
						getClientRect(endNode).left<getClientRect(target).left)
					){
						dispatch(ACTION.Selection.SELECT(end.id,end.at,id,at))
						dispatch(ACTION.Selection.END_AT(id,at))
					}else{
						dispatch(ACTION.Selection.START_AT(id,at))
					}
				}
			}
		}
	}
}

let lastContent=null
export default connect(state=>{
	let selection=getSelection(state)
	let content=state.get("content")
	let {end,start,active,cursorAt}=selection
	let {id,at}=selection[cursorAt]
	let contentChanged=!!(lastContent && lastContent!==content)
	lastContent=content
	return {id,at,active, contentChanged}
})(
class extends Component{
	static propTypes={
		onRef:PropTypes.func.isRequired
	}
	render(){
		const {onRef,...others}=this.props
		return <Cursor {...others} ref={onRef}/>
	}
})
