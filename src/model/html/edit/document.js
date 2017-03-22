import React, {PureComponent, Component, PropTypes} from "react"
import Base from "../document"

import {ACTION,Cursor,Selection} from "state"

import {editable} from "model/edit"

import uuid from "tools/uuid"

export default class Document extends editable(Base){
	uuid=`doc${uuid()}`
	render(){
        return (
			<div id={this.uuid}>
				<div ref="main">
					{super.render()}
				</div>
				{
					/*
				<Selection docId={this.uuid}/>
				<StateCursor ref="cursor" docId={this.uuid}/>
				*/
				}
			</div>
		)
    }

	componentDidMount(){
		if(super.componentDidMount)
			super.componentDidMount()
		
		//this.cursorReady()
	}


	get root(){
		return this.refs.main
	}

	cursorReady(){
		let firstText=this.root.querySelector("span[data-content]").getAttribute("data-content")
		this.context.store.dispatch(ACTION.Selection.SELECT(firstText,0))
		this.root.addEventListener("click", e=>{
			const target=e.target
			switch(target.nodeName.toLowerCase()){
			case 'span':
				let text=target.textContent
				let contentID=target.getAttribute("data-content")
				let [x]=offset(e, target)
				this.context.store.dispatch(ACTION.Cursor.AT(contentID,0, x,this.uuid))
			break
			}
		})
	}

	static contextTypes={
		store:PropTypes.any
	}
}

import offset from "mouse-event-offset"
import {connect} from "react-redux"

import {getContent,getContentClientBoundBox} from "state/selector"

const StateCursor=connect((state,{docId})=>{
	const {start:{id,at}}=state.get("selection")
	return {id,at}
})(class extends PureComponent{
	static propTypes={
		id: PropTypes.string,
		at: PropTypes.number
	}
	
	static contextTypes={
		store: PropTypes.any
	}
	
	info=null
	
	componentWillReceiveProps(next){
		this.info=this.position(next)
	}
	
	position({docId, id, at}){
		let node=document.querySelector(`#${docId} span[data-content="${id}"]`)
		if(!node)
			return null

		
		const state=this.context.store.getState()

		let {top,left}=node.getBoundingClientRect()
		const content=getContent(state, id).toJS()
		const text=content.children
		let wordwrapper=new HtmlWrapper(node)
		let contentWidth=wordwrapper.stringWidth(text)
		let {height, descent}=wordwrapper
		left+=contentWidth
		wordwrapper.close()
		return {left, top, height}
	}
	
	render(){
		return <Cursor dispatch={this.props.dispatch} 
			{...this.info||{height:0}}
			editorId={this.props.docId}/>
	}
})


class HtmlWrapper{
	constructor(node){
		this.node=node
		this.tester=node.cloneNode(false)
		this.tester.style="position:absolute;left:-999;top:0;"
		node.parentNode.appendChild(this.tester)
		this.height=node.getBoundingClientRect().height
		this.descent=0
	}
	
	stringWidth(word){
        this.tester.innerHTML=word
        return this.tester.getBoundingClientRect().width
    }
	
	close(){
		this.tester.parentNode.removeChild(this.tester)
	}
}


