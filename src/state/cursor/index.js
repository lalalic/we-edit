import React, {Component, Children} from "react"
import PropTypes from "prop-types"

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
		const {docId, getCursorInput,query}=this.context
		if(docId!==active)
			return
		this.style=query().position(id,at)
		let {top,left,height,fontFamily,fontSize}=this.style||{}
		getCursorInput().setState({
			top,left,height,fontFamily,fontSize,
			up: this.up.bind(this),
			down: this.down.bind(this)
		})
	}

	up(shiftKey){
		const {docId,store, query}=this.context
		const dispatch=store.dispatch
		const state=store.getState()
		const {start,end,cursorAt}=getSelection(state)
		const $=query()
		let {id,at}=$.prevLine(this.style)

		if(!shiftKey)
			dispatch(ACTION.Cursor.AT(id,at))
		else{
			if(start.id==end.id && start.at==end.at){
				dispatch(ACTION.Selection.START_AT(id,at))
			}else{
				if(cursorAt=="start")
					dispatch(ACTION.Selection.START_AT(id,at))
				else if(cursorAt=="end"){
					let {left,top}=$.position(id,at)
					let {left:left0,top:top0}=$.position(start.id, start.at)
					if((top0==top && left<left0) //same line, new point is on the left of start
						|| (top<top0)) //above start point line
						{
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
		const {docId,store,query}=this.context
		const dispatch=store.dispatch
		const state=store.getState()
		const {start,end,cursorAt}=getSelection(state)
		const $=query()

		let {id,at}=$.nextLine(this.style)

		if(!shiftKey)
			dispatch(ACTION.Cursor.AT(id,at))
		else{
			if(start.id==end.id && start.at==end.at){
				dispatch(ACTION.Selection.END_AT(id,at))
			}else{
				if(cursorAt=="end")
					dispatch(ACTION.Selection.END_AT(id,at))
				else if(cursorAt=="start"){
					let {left,top}=$.position(id,at)
					let {left:left1, top:top1}=$.position(end.id, end.at)
					if((top==top1 && left>left1) || (top>top1)){
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
