import React, {PureComponent, Component, Fragment} from "react"
import PropTypes from "prop-types"
import memoize from "memoize-one"
import Waypoint from "react-waypoint"
import {getContent,getSelection,getClientRect, ACTION, ContentQuery} from "we-edit"

import {setDisplayName,compose, getContext} from "recompose"

import Base from "../document"
import Responsible from "../composed/responsible"
import {Document as ComposedDocument,Group} from "../composed"

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
		let mount=a=>{
			//console.log(`${a.getComposeType()}[${a.props.id}] mounted`)
			this.composers.set(a.props.id,a)
		}
		let unmount=a=>{
			//console.log(`${a.getComposeType()}[${a.props.id}] unmounted`)
			this.composers.delete(a.props.id)
		}
		return {
			...super.getChildContext(),
			shouldContinueCompose,
			shouldRemoveComposed,
			mount,unmount,
		}
	}

	render(){
		const {viewport, mode, error}=this.state
		const {canvas,scale,pageGap,docId,contentHash}=this.props
		if(!viewport){//to find container width, height
			return <div ref="viewporter" />
		}
		const pages=this.computed.composed
		const content=(
				<Responsible
					docId={docId}
					contentHash={contentHash}
					getComposer={id=>{
						if(this.composers.has(id)){
							return this.composers.get(id)
						}else{
							debugger
						}
					}}
					ref={a=>this.clientDocument=a}
					scale={scale}
					pgGap={pageGap}
					pages={pages}
					>
					{pages.length>0 && !this.isAllChildrenComposed() &&
						<ComposeMoreTrigger
							y={ComposedDocument.composedY(pages, pageGap)}
							onEnter={y=>{
								this.clientDocument &&
								this.clientDocument.locator &&
								this.clientDocument.locator.setState({canvas:null},()=>{
									return
									this.setState({y,mode:"viewport"})
								})
							}}
							/>
					}
				</Responsible>
						
		)


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

	componentWillReceivProps(){
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
		this.setState({viewport:{width:parseInt(width),height:parseInt(height||1056)}})
	}

	get viewport(){
		return this.state.viewport
	}
}


const ComposeMoreTrigger=compose(
	setDisplayName("More"),
	getContext({debug: PropTypes.bool})
)(({onEnter,y, debug})=>(
	<Waypoint onEnter={()=>onEnter(y)} >
		<Group y={y}>
			{debug ? <line x1="0" y1="0" x2="10000" y2="0" strokeWidth="2" stroke="red"/> : null}
		</Group>
	</Waypoint>
))
