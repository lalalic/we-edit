import React, {PureComponent as Component, Children, PropTypes} from "react"
import {connect} from "react-redux"
import {getContent, getContentStyle, getSelection} from "state/selector"
import {ACTION} from "state"

import get from "lodash.get"

export class Cursor extends Component{
	static display="cursor"
	static contextTypes={
		store: PropTypes.any,
		docId: PropTypes.string,
		getCursorInput: PropTypes.func
	}
	static propTypes={
		id: PropTypes.string,
		at: PropTypes.number,
		active: PropTypes.string,
		getWordWrapper: PropTypes.func,
		getRatio: PropTypes.func
	}

	static defaultProps={
		getRatio(){
			return 1
		}
	}

	render(){
		return null
	}

	componentWillReceiveProps({active,id,at}, {docId,getCursorInput}){
		if(this.props.id!==id || this.props.at!==at){
			this.node=this.getTargetNode(id, at)
			this.style=this.position(docId,id,at)
		}

		if(docId==active)
			getCursorInput()
			.setState({
				...this.style,
				up:this.up.bind(this),
				down:this.down.bind(this)
			})
	}

	componentDidMount(){
		const {active,id,at}=this.props
		const {docId,getCursorInput}=this.context
		this.node=this.getTargetNode(id, at)
		this.style=this.position(docId,id,at)
	}

	position(docId,id,at){
		const state=this.context.store.getState()
		const {children:text}=getContent(state, id).toJS()
		const style=getContentStyle(state, docId, id)

		let node=this.node
		let {top,left}=node.getBoundingClientRect()
		let from=node.dataset.endAt-node.textContent.length
		top+=window.scrollY
		left+=window.scrollX

		let wordwrapper=this.props.getWordWrapper(style)
		let width=wordwrapper.stringWidth(text.substring(from,at))
		let {height, descent}=wordwrapper
		let ratio=this.props.getRatio()
		if(ratio){
			width=width/ratio
			height=height/ratio
			descent=descent/ratio
		}
		left+=width

		return {...style,left,top,height,width}
	}

	//get node of cusor at
	getTargetNode(id,at){
		let nodes=document.querySelectorAll(`#${this.context.docId} [data-content="${id}"]`)
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

		let {left,top}=this.node.getBoundingClientRect()

		let {height}=current.getBoundingClientRect()
		let y=top+height+next.getBoundingClientRect().height/2
		let x=left+this.style.width
		let pots=next.querySelectorAll("text")
		let id,at,target
		for(let i=0,len=pots.length;i<len;i++){
			let {left:l,width:w}=pots[i].getBoundingClientRect()
			if(l<=x && x<=l+w){
				target=pots[i]
				id=target.dataset.content
				let text=target.textContent
				let wrapper=this.props.getWordWrapper(getContentStyle(state, this.context.docId, id))
				let ratio=this.props.getRatio()
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
		const dispatch=this.context.store.dispatch
		const state=this.context.store.getState()
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
					let startNode=this.getTargetNode(start.id,start.at)
					let startLine=this.getLineNode("",startNode)
					if(startLine.parentNode.previousSibling==next.parentNode ||
						(startLine==next &&
						(startNode==target && at<start.at) ||
						startNode.getBoundingClientRect().left>target.getBoundingClientRect().left
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
		const dispatch=this.context.store.dispatch
		const state=this.context.store.getState()
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
					let endNode=this.getTargetNode(end.id,end.at)
					let endLine=this.getLineNode("",endNode)
					if(endLine.parentNode.nextSibling==next.parentNode ||
						(endLine==next &&
						(endNode==target && at>end.at) ||
						endNode.getBoundingClientRect().left<target.getBoundingClientRect().left)
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

export default connect(state=>{
	let selection=getSelection(state)
	let {end,start,active,cursorAt}=selection
	let {id,at}=selection[cursorAt]
	return {id,at,active}
})(Cursor)
