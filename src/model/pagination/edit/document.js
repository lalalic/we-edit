import React, {PureComponent, Component} from "react"
import PropTypes from "prop-types"

import {connect} from "react-redux"
import Waypoint from "react-waypoint"

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

	state={compose2Page:1, mode:"performant"}

	composers=new Map([[this.props.id,this]])
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
		return new ComposedDocument.Query(this,this.context.store.getState(),PageGap)
	}

	get canvas(){
		return this.refs.canvas
	}

	render(){
		const {viewport, mode}=this.state
		if(!viewport){//to find container width, height
			return <div ref="viewporter"/>
		}
		let props={}
		if(mode=="content"){
			//props.minHeight=this.canvas.getClientRect().height
		}

        return (
			<div ref="viewporter">
				<div style={{display:"none"}}>
				{this.props.children}
				</div>
				<ComposedDocument ref="canvas"
					{...props}
					scale={this.props.scale}
					pgGap={PageGap}
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
		this.clearComposed()
		this.setState({mode:"content"})
		this.continueComposing=true
	}

	componentDidMount(){
		if(!this.state.viewport){
			this.getContainer(this.refs.viewporter)
			const{width,height}=this.container.getBoundingClientRect()
			this.setState({viewport:{width,height}})
		}
	}

	getContainer(node){
		return this.container=(function getScrollParent(node) {
			const isElement = node instanceof HTMLElement;
			const overflowY = isElement && window.getComputedStyle(node).overflowY;
			const isScrollable = overflowY !== 'visible' && overflowY !== 'hidden';

			if (!node) {
			return null;
			} else if (isScrollable && node.scrollHeight >= node.clientHeight) {
			return node;
			}

			return getScrollParent(node.parentNode) || document.body;
		})(node)
	}

	shouldRemoveComposed(){
		return this.state.mode=="content"
	}

	shouldContinueCompose(){
		const {compose2Page,mode, viewport}=this.state

		if(mode=="content" && this.continueComposing==false)
			return false

		const $=this.query()
		if($.y<=viewport.height)
			return true

		switch(mode){
		case "content":
			let maxViewableY=viewport.height-$.svg.top
			maxViewableY*=this.canvas.ratio
			return this.continueComposing=$.y<maxViewableY
		case "performant":
		default:
			return this.computed.composed.length<compose2Page+1
		}
	}


}
