import React, {PureComponent, Component, Fragment} from "react"
import PropTypes from "prop-types"

import {connect} from "react-redux"

import Base from "../document"
import {Text} from "model/pagination"
import ComposedDocument from "./composed-document"

import {ACTION} from "state"
import {getContent,getSelection} from "state/selector"
import {editable} from "model/edit"
import recomposable from "./recomposable"

import offset from "mouse-event-offset"
import getClientRect from "tools/get-client-rect"

const Super=editable(recomposable(Base))
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

	constructor(){
		super(...arguments)
		this.composers=new Map([[this.props.id,this]])
		this.state={mode:"viewport",...this.state}
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
			query,mount,unmount
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
			minHeight=this.canvas.clientRect.height
		}

		return (
			<Fragment>
				{this.props.children}
				<ComposedDocument
					ref="canvas"
					style={{minHeight, ...canvasStyle}}
					canvas={canvas}
					scale={scale}
					pgGap={PageGap}
					pages={this.computed.composed}
					isAllComposed={()=>this.isAllChildrenComposed()}
					composeMore={triggerAt=>this.setState({triggerAt,mode:"viewport"})}
					/>
			</Fragment>
		)
    }

	componentWillReceiveProps(){
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
		let viewableY=viewport.height-$.svg.top
		let cacheY=viewport.height
		return contentY<viewableY+cacheY
	}
}
