import React, {PureComponent, Component, Fragment} from "react"
import PropTypes from "prop-types"
import {getContent,getSelection,getClientRect, ACTION, editify} from "we-edit"
import {connect} from "react-redux"

import Base from "../document"
import ComposedDocument from "./composed-document"

import recomposable from "./recomposable"

import offset from "mouse-event-offset"

const Super=editify(recomposable(Base))
const PageGap=24
export default class Document extends Super{
	static contextTypes={
		...Super.contextTypes,
		store: PropTypes.any,
	}

	static childContextTypes={
		...Super.childContextTypes,
		shouldContinueCompose: PropTypes.func,
		shouldRemoveComposed: PropTypes.func,
		query: PropTypes.func,
		mount: PropTypes.func,
		unmount: PropTypes.func,
	}

	constructor({screenBuffer}){
		super(...arguments)
		this.composers=new Map([[this.props.id,this]])
		this.state={mode:"viewport",...this.state}
		this.screenBuffer=typeof(screenBuffer)=="function" ? screenBuffer : a=>screenBuffer||a;
	}
	getChildContext(){
		let shouldRemoveComposed=this.shouldRemoveComposed.bind(this)
		let shouldContinueCompose=this.shouldContinueCompose.bind(this)
		let query=this.query.bind(this)
		let mount=a=>this.composers.set(a.props.id,a)
		let unmount=a=>this.composers.delete(a.props.id)
		return {
			...super.getChildContext(),
			shouldContinueCompose,
			shouldRemoveComposed,
			query,mount,unmount,
		}
	}

	query(){
		return new ComposedDocument.Query(this,this.context.store.getState(),PageGap,this.scale)
	}

	get canvas(){
		return this.refs.canvas
	}

	get scale(){
		if(this.canvas){
			return this.canvas.scale
		}else{
			return this.props.scale
		}
	}

	render(){
		const {viewport, mode}=this.state
		const {canvas,scale, canvasStyle}=this.props
		if(!viewport){//to find container width, height
			return <div ref="viewporter"/>
		}

		let minHeight=undefined
		if(mode=="content" && this.canvas){
			//to keep scrollbar position
			minHeight=this.canvas.svg.getBoundingClientRect().height
		}

		const content=(<ComposedDocument
					ref="canvas"
					style={{minHeight, ...canvasStyle}}
					scale={scale}
					pgGap={PageGap}
					pages={this.computed.composed}
					isAllComposed={()=>this.isAllChildrenComposed()}
					composeMore={triggerAt=>this.setState({triggerAt,mode:"viewport"})}
					/>)

		return (
			<Fragment>
				{this.props.children}
				{canvas ? React.cloneElement(canvas,{pages:this.computed.composed,content}) : content}
			</Fragment>
		)
    }

	componentWillReceiveProps({screenBuffer}){
		this.clearComposed()
		this.setState({mode:"content"})
	}

	componentDidMount(){
		if(!this.state.viewport){
			this.getContainer(this.refs.viewporter)
			const{width,height}=this.container.getBoundingClientRect()
			this.setState({viewport:{width,height:height||1056}})
		}
	}

	//with width&&height, or scrollable Y
	getContainer(node){
		return this.container=(function getFrameParent(node) {
			const isElement = node instanceof HTMLElement;
			if(isElement){
				const {overflowY,width,height} = window.getComputedStyle(node);
				if(width>0 && height>0)
					return node
				const isScrollable = overflowY !== 'visible' && overflowY !== 'hidden';
				if(isScrollable)
					return node
			}

			if (!node) {
				return null;
			}

			return getFrameParent(node.parentNode) || document.body;
		})(node)
	}

	shouldRemoveComposed(){
		return this.state.mode=="content"
	}

	shouldContinueCompose(){
		const {mode, viewport}=this.state
		const $=this.query()
		let contentY=$.toViewportCoordinate($.y)
		let viewableY=viewport.height-$.svg.top//svg.top must be dynamic per scroll
		let bufferY=this.screenBuffer(viewport.height)
		return contentY<viewableY+bufferY
	}
	
	get viewport(){
		return this.state.viewport
	}
}
