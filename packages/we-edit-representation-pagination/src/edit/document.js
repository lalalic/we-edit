import React, {PureComponent, Component, Fragment} from "react"
import PropTypes from "prop-types"
import {getContent,getSelection,getClientRect, ACTION, editify} from "we-edit"
import {connect} from "react-redux"

import Base from "../document"
import Responsible from "./responsible"

import recomposable from "./recomposable"

import offset from "mouse-event-offset"

const Super=editify(recomposable(Base))
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
		return new Responsible.Query(this,this.context.store.getState(),this.props.pageGap,this.scale)
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
		const {canvas,scale,pageGap}=this.props
		if(!viewport){//to find container width, height
			return <div ref="viewporter" />
		}

		let minHeight=undefined
		if(mode=="content" && this.canvas){
			//to keep scrollbar position
			minHeight=this.canvas.svg.getBoundingClientRect().height
		}

		const content=<Responsible
							ref="canvas"
							style={{minHeight}}
							scale={scale}
							pgGap={pageGap}
							pages={this.computed.composed}
							isAllComposed={a=>this.isAllChildrenComposed()}
							composeMore={y=>this.setState({y,mode:"viewport"})} 
							/>

		return (
			<Fragment>
				{this.props.children}
				{canvas ? React.cloneElement(canvas,{content}) : content}
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
			const {height}=this.container.getBoundingClientRect()
			
			let a=this.refs.viewporter, width
			while((width=a.getBoundingClientRect().width)==0){
				a=a.parentNode
			}
			
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
