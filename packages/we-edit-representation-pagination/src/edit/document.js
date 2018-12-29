import React, {PureComponent, Component, Fragment} from "react"
import PropTypes from "prop-types"
import memoize from "memoize-one"
import {getContent,getSelection,getClientRect, ACTION, ContentQuery,connect} from "we-edit"

import Base from "../document"
import Responsible from "../composed/responsible"
import {Document as ComposedDocument} from "../composed"

import editable from "./editable"

import offset from "mouse-event-offset"

const Super=editable(Base,{continuable:true})
export default class Document extends Super{
	static propTypes={
		...Super.propTypes,
		pageGap: PropTypes.number,
		screenBuffer: PropTypes.number
	}

	static defaultProps={
		...Super.defaultProps,
		pageGap:12,
		screenBuffer: 1
	}
	static contextTypes={
		...Super.contextTypes,
		activeDocStore: PropTypes.any,
	}

	constructor({screenBuffer,viewport}){
		super(...arguments)
		this.state={mode:"content",viewport, ...this.state}
	}

	get bufferHeight(){
		return this.props.screenBuffer*this.state.viewport.height
	}

	render(){
		if(!this.state.viewport){//to find container width, height
			return <div ref="viewporter" />
		}

        return super.render()
    }

	renderComposed(){
		const {canvas,scale,pageGap,docId,content}=this.props
		const pages=this.computed.composed
		return (
				<Responsible
					docId={docId}
					content={content}
					getComposer={this.getComposer}
					scale={scale}
					pgGap={pageGap}
					pages={pages}
					continueCompose={{
						isAllComposed: ()=>this.isAllChildrenComposed(),
						isSelectionComposed:selection=>this.isSelectionComposed(selection),
						compose4Selection:()=>this.setState({mode:"selection",y:0}),
						compose4Scroll: y=>this.setState({mode:"scroll",y}),
						composedY:()=>this.composedY()
					}}
					/>

		)
	}

	static getDerivedStateFromProps({changed,content},{mode,y}){
		let state={}
		if(content && !content.equals(state.content)){
			state.content=content
			if(changed){
				state.mode="content"
				state.y=0
			}
		}
		return state
	}

	componentDidMount(){
		if(!this.state.viewport){
			this.initViewport(this.refs.viewporter)
		}

		super.componentDidMount()
	}

	componentDidUpdate(){
		this.dispatch(ACTION.Statistics({
			pages:this.computed.composed.length,
			allComposed:this.isAllChildrenComposed(),
			words: this.composedWords()
		}))
	}

	composedWords(){
		return this.composers.reduce((words,a)=>words+=(a.computed.atoms ? a.computed.atoms.length : 0),0)
	}

	/**
	* 1. selection end
	* 2. viewport: viewporter.scrollTop+viewporter.height
	**/
	shouldContinueCompose(a){
		const aboveViewableBottom=()=>{
			const {y=0,viewport:{height,node:{scrollTop}},mode}=this.state
			const composedY=this.composedY() * this.props.scale
			return composedY<Math.max(scrollTop,y)+height+this.bufferHeight
		}

		const should=aboveViewableBottom() || !this.isSelectionComposed()

		if(!should){
			this.notifyNotAllComposed(a)
		}
		return should
	}

	composedY(){
		const {computed:{composed:pages}, props:{pageGap}}=this
		return pages.reduce((w,page)=>w+page.composedHeight+pageGap,0)
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
