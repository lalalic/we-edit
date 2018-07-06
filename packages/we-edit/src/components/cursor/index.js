import React, {Component, Children} from "react"
import PropTypes from "prop-types"

import {connect} from "react-redux"
import ACTION from "../../state/action"
import {getContent,  getSelection} from "../../state/selector"

import get from "lodash.get"

import Shape from "./shape"

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
	}

	contentChanged=false
	
	constructor(){
		super(...arguments)
		this.up=this.up.bind(this)
		this.down=this.down.bind(this)
		this.i=0
	}

	render(){
		const {children}=this.props
		return (
			<Shape ref={a=>this.shape=a}>
				{children}
			</Shape>
		)
	}

	componentWillReceiveProps({content}){
		this.contentChanged=this.props.content!=content
	}

	shouldComponentUpdate(){
		//when content changed, composition must happen, it will be forceUpdated by composed document
		return !this.contentChanged
	}

	componentDidUpdate(prevProps){
		const {active,id,at, up, down}=this.props
		const {docId, getCursorInput,query}=this.context
		if(docId!==active)
			return
		let docQuery=query()
		this.style=docQuery.position(id,at)
		if(!this.style)
			return
		let {
			top,left, height,fontFamily,fontSize,
			canvasTop=top, canvasLeft=left, 
			}=this.style
		getCursorInput()
			.setState({
				style:this.style,
				query:docQuery,
				
				top,left,fontFamily,fontSize,
				height: this.shape ? 0.1 : height,
				up: this.up,
				down: this.down
			})

		if(this.shape)
			this.shape.setState({top:canvasTop,left:canvasLeft,height})
	}

	up(shiftKey){
		const {store, query}=this.context
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
		const {store,query}=this.context
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

const CursorHolder=connect((state)=>{
	let selection=getSelection(state)
	let content=state.get("content")
	let {end,start,active,cursorAt}=selection
	let {id,at}=selection[cursorAt]
	return {id,at,active, content}
},null,null, {withRef:true})(Cursor)

export default class extends Component{
	constructor(){
		super(...arguments)
		this.componentWillReceiveProps(this.props)
	}

	forceUpdate(){
		if(this.cursor)
			this.cursor.forceUpdate()
	}

	componentWillReceiveProps({render}){
		this.Shape=render
	}

	render(){
		const {children, render, ...others}=this.props
		return (
			<CursorHolder
				ref={a=>{a && (this.cursor=a.getWrappedInstance())}}
				{...others}>
				{this.Shape ? <this.Shape/> : children}
			</CursorHolder>
			)
	}
}
