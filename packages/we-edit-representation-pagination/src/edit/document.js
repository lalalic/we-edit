import React, {PureComponent, Component, Fragment} from "react"
import PropTypes from "prop-types"
import memoize from "memoize-one"
import {getContent,getSelection,getClientRect, ACTION, ContentQuery} from "we-edit"

import Base from "../document"
import Responsible from "../composed/responsible"
import {Document as ComposedDocument} from "../composed"

import recomposable from "./recomposable"

import offset from "mouse-event-offset"

const Super=recomposable(Base)
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
		shouldContinueCompose: PropTypes.func,
		shouldRemoveComposed: PropTypes.func,
		query: PropTypes.func,
		mount: PropTypes.func,
		unmount: PropTypes.func,
		scrollableAncestor: PropTypes.any
	}

	constructor({screenBuffer,viewport}){
		super(...arguments)
		this.composers=new Map([[this.props.id,this]])
		this.state={mode:"viewport",viewport, ...this.state}
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
		return this.clientDocument
		//return new Query(this.context.activeDocStore.getState(),this.composers, this.clientDocument, this.props.scale)
	}

	render(){
		const {viewport, mode, error}=this.state
		const {canvas,scale,pageGap}=this.props
		if(!viewport){//to find container width, height
			return <div ref="viewporter" />
		}

		const content=<Responsible
							innerRef={a=>{
								if(this.clientDocument=a){
									a.getComposer=id=>this.composers.get(id)
								}
							}}
							scale={scale}
							pgGap={pageGap}
							pages={this.computed.composed}
							isAllComposed={a=>this.isAllChildrenComposed()}
							composeMore={y=>this.setState({y,mode:"viewport"})}
							/>

		return (
			<Fragment key={error}>
				{this.props.children}
				{canvas ? React.cloneElement(canvas,{content, viewport}) : content}
			</Fragment>
		)
    }

	componentDidCatch(error){
		console.error(error)
		this.setState({error})
	}

	componentWillReceiveProps({screenBuffer}){
		this.clearComposed()
		this.setState({mode:"content"})
	}

	componentDidMount(){
		if(!this.state.viewport){
			this.initViewport(this.refs.viewporter)
		}
	}

	shouldRemoveComposed(){
		return this.state.mode=="content"
	}

	shouldContinueCompose(){
		const {mode, viewport}=this.state
		const composedY=ComposedDocument.composedY(this.computed.composed,this.props.pageGap,this.props.scale)

		let viewableY=viewport.height
			-(this.clientDocument ? this.clientDocument.getBoundingClientRect().top : 0)//svg.top must be dynamic per scroll
		let bufferY=this.screenBuffer(viewport.height)
		return composedY<viewableY+bufferY
	}

	initViewport(viewporter){
		const container=(function getFrameParent(node){
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
		})(viewporter);

		const {height}=container.getBoundingClientRect()

		let a=viewporter, width
		while((width=a.getBoundingClientRect().width)==0){
			a=a.parentNode
		}
		this.setState({viewport:{width:parseInt(width),height:parseInt(height||1056)}})
	}

	get viewport(){
		return this.state.viewport
	}
}
