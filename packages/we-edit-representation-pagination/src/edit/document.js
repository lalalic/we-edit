import React, {PureComponent, Component, Fragment} from "react"
import PropTypes from "prop-types"
import memoize from "memoize-one"
import Waypoint from "react-waypoint"
import {getContent,getSelection,getClientRect, ACTION, ContentQuery} from "we-edit"

import {setDisplayName,compose, getContext} from "recompose"

import Base from "../document"
import Responsible from "../composed/responsible"
import {Document as ComposedDocument,Group} from "../composed"

import editable from "./editable"

import offset from "mouse-event-offset"

const Super=editable(Base,{locatable:false,continuable:true})
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
		scrollableAncestor: PropTypes.any
	}

	constructor({screenBuffer=100,viewport}){
		super(...arguments)
		this.composers=new Map([[this.props.id,this]])
		this.state={mode:"viewport",viewport, ...this.state}
		this.screenBuffer=typeof(screenBuffer)=="function" ? screenBuffer : a=>screenBuffer;
	}
	get viewableY(){
		const {viewport}=this.state
		return viewport.node.scrollTop+viewport.height
	}

	get bufferHeight(){
		return this.screenBuffer(this.state.viewport.height)
	}	

	getChildContext(){
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
			mount,unmount,
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
		const {canvas,scale,pageGap,docId,contentHash}=this.props
		const pages=this.computed.composed
		return (
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
					scale={scale}
					pgGap={pageGap}
					pages={pages}
					>
					{
						<ComposeMoreTrigger
							y={ComposedDocument.composedY(pages, pageGap)||(this.viewableY+this.bufferHeight)}
							onEnter={y=>{
								if(!this.isAllChildrenComposed()){
									let scrollTop=viewport.node.scrollTop
									this.setState({y,mode:"viewport"},()=>{
										//viewport.node.scrollTop=scrollTop
									})
								}
							}}
							/>
					}
				</Responsible>

		)
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
			const composedY=ComposedDocument.composedY(this.computed.composed,this.props.pageGap,this.props.scale)
			return composedY<this.viewableY+this.bufferHeight
		}

		const selectionComposed=()=>{
			const {activeDocStore}=this.context
			const {end:{id}}=getSelection(activeDocStore.getState())
			if(id){
				return !!this.composers.get(id)
			}
			return true
		}

		const should=aboveViewableBottom() || !selectionComposed()

		if(!should){
			this.notifyNotAllComposed(a)
		}
		return should
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
