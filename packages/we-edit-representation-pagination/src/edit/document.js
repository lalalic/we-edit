import React, {PureComponent, Component, Fragment} from "react"
import PropTypes from "prop-types"
import memoize from "memoize-one"
import {getContent,getSelection,getClientRect, ACTION, ContentQuery,connect} from "we-edit"

import Base from "../document"
import Responsible from "../composed/responsible"
import {Document as ComposedDocument} from "../composed"

import editable from "./editable"

import offset from "mouse-event-offset"

const Super=editable(Base,{locatable:true,continuable:true})
export default class Document extends Super{
	static propTypes={
		...Super.propTypes,
		pageGap: PropTypes.number,
	}

	static defaultProps={
		...Super.defaultProps,
		pageGap:12
	}
	static contextTypes={
		...Super.contextTypes,
		activeDocStore: PropTypes.any,
	}

	static childContextTypes={
		...Super.childContextTypes,
		mount: PropTypes.func,
		unmount: PropTypes.func,
		getComposer: PropTypes.func,
	}

	constructor({screenBuffer,viewport}){
		super(...arguments)
		this.composers=new Map([[this.props.id,this]])
		this.state={mode:"content",viewport, ...this.state}
		this.screenBuffer=typeof(screenBuffer)=="function" ? screenBuffer : a=>screenBuffer!=undefined ? screenBuffer : a;
		this.getComposer=this.getComposer.bind(this)
	}
	get viewableY(){
		const {viewport}=this.state
		return viewport.node.scrollTop+viewport.height
	}

	get bufferHeight(){
		return this.screenBuffer(this.state.viewport.height)
	}

	getComposer(id){
		return this.composers.get(id)
	}

	getChildContext(){
		let mount=a=>{
			//console.log(`${a.getComposeType()}[${a.props.id}] mounted`)
			this.composers.set(a.props.id,a)
		}
		let unmount=a=>{
			console.log(`${a.getComposeType()}[${a.props.id}] unmounted`)
			this.composers.delete(a.props.id)
		}
		return {
			...super.getChildContext(),
			mount,unmount,
			getComposer:this.getComposer
		}
	}

	render(){
		if(!this.state.viewport){//to find container width, height
			return <div ref="viewporter" />
		}

        return super.render()
    }

	renderComposed(){
		const {viewport, mode, error}=this.state
		const {canvas,scale,pageGap,docId,content}=this.props
		const pages=this.computed.composed
		return (
				<Responsible
					docId={docId}
					content={content}
					getComposer={id=>this.composers.get(id)}
					scale={scale}
					pgGap={pageGap}
					pages={pages}
					continueCompose={{
						isAllComposed: ()=>this.isAllChildrenComposed(),
						isSelectionComposed:selection=>this.isSelectionComposed(selection),
						compose4Selection:()=>this.setState({mode:"selection",time:Date.now()}),
						compose4Scroll: y=>this.setState({y,mode:"scroll",time:Date.now()}),
					}}
					/>

		)
	}

	static getDerivedStateFromProps({changed,contentHash},{mode}){
		let state={}
		if(changed && contentHash!=state.contentHash){
			state.mode="content"
			state.y=0
		}
		if(contentHash!=state.contentHash){
			state.contentHash=contentHash
		}
		return state
	}

	componentDidCatch(error){
		console.error(error)
		this.setState({error})
	}

	componentDidMount(){
		if(!this.state.viewport){
			this.initViewport(this.refs.viewporter)
		}
	}

	/**
	* 1. selection end
	* 2. viewport: viewporter.scrollTop+viewporter.height
	**/
	shouldContinueCompose(a){
		const aboveViewableBottom=()=>{
			const {y=0,viewport}=this.state
			const composedY=ComposedDocument.composedY(this.computed.composed,this.props.pageGap,this.props.scale)
			return composedY<Math.max(this.viewableY+this.bufferHeight,y+viewport.height+this.bufferHeight)
		}

		const should=aboveViewableBottom() || !this.isSelectionComposed()

		if(!should){
			this.notifyNotAllComposed(a)
		}
		return should
	}

	isSelectionComposed(selection){
		const {end,start}=selection||getSelection(this.context.activeDocStore.getState())
		return !start.id ? true : 
			this.composers.has(start.id) && this.getComposer(start.id).isAllChildrenComposed() &&
			this.composers.has(end.id) && this.getComposer(end.id).isAllChildrenComposed()
	}

	initViewport(viewporter){
		const container=(function getFrameParent(node){
			const {overflowY,width,height} = window.getComputedStyle(node);
			if(width>0 && height>0)
				return node
			const isScrollable = overflowY !== 'visible' && overflowY !== 'hidden';
			if(isScrollable)
				return node

			if (!node) {
				return null;
			}

			return getFrameParent(node.closest('[style*="overflow"]')) || document.body;
		})(viewporter);

		const {height}=container.getBoundingClientRect()

		let a=viewporter, width
		while((width=a.getBoundingClientRect().width)==0){
			a=a.parentNode
		}
		this.setState({viewport:{width:parseInt(width),height:parseInt(height||1056),node:container}})
	}

	get viewport(){
		return this.state.viewport
	}
}

