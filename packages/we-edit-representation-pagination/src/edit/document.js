import React, {PureComponent, Component, Fragment} from "react"
import PropTypes from "prop-types"
import memoize from "memoize-one"
import {getContent,getSelection,getClientRect, ACTION, ContentQuery} from "we-edit"

import Base from "../document"
import Responsible from "../composed/responsible"

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
		return new Query(this.context.activeDocStore.getState(),this.composers, this.clientDocument)
	}

	render(){
		const {viewport, mode, error}=this.state
		const {canvas,scale,pageGap}=this.props
		if(!viewport){//to find container width, height
			return <div ref="viewporter" />
		}

		const content=<Responsible
							innerRef={a=>this.clientDocument=a}
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
		let contentY=this.clientDocument.toViewportCoordinate(this.clientDocument.y)
		let viewableY=viewport.height-this.clientDocument.getBoundingClientRect().top//svg.top must be dynamic per scroll
		let bufferY=this.screenBuffer(viewport.height)
		return contentY<viewableY+bufferY
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

class Query{
	constructor(content, composers, clientDoc){
		this.content=content
		this.composers=composers
		this.clientDocument=clientDoc
	}
	
	getComposer(id){
		return this.composers.get(id)
	}
	
	getContent=memoize(id=>new ContentQuery(this.content,id ? `#${id}` : null))

	isTextNode(id){
		return this.getComposeType(id)==="text"
	}
	
	isComposableNode(id){
		return !!this.composers.get(id)
	}
	
	position(id,at){
		if(this.isTextNode(id)){
			let {x,y,endat,length}=this.clientDocument.getTextClientRect(id,at)
			let from=endat-length
			let composer=this.getComposer(id)
			let {children:text,...props}=composer.props
			let measure=composer.measure
			let {height,descent,fontSize, fontFamily}=measure.defaultStyle

			x+=measure.stringWidth(text.substring(from,at))

			y=y-height+descent

			return {
				x,y,
				height:this.clientDocment.toViewportCoordinate(height),
				descent:this.clientDocument.toViewportCoordinate(descent),
				fontFamily,
				fontSize,
			}
		}else if(this.isComposableNode(id)){
			let rects=this.clientDocument.getClientRects(id)
		}else{
			const $=this.getContent(id)
			if(at==0){
				//get first composed node
				let found=$.findFirst(a=>this.isComposableNode(a.get("id")))
				if(found){
					id=found.attr('id')
				}
			}else if(at==1){
				//get last composed node
				let found=$.findLast(a=>isComposableNode(a.get("id")))

				if(found){
					id=found.attr("id")
				}
			}
			
		}
	}
}
