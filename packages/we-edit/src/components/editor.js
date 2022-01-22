import React, {PureComponent, Component, Fragment} from "react"
import PropTypes from "prop-types"

import {connect,ACTION} from "../state"
import {getUI} from "../state/selector"
import Representation from "./representation"
import uuid from "../tools/uuid"
import memoize from "memoize-one"
import shallowEqual from "../tools/shallow-equal"
import ContextMenu from "./context-menu"

export class Editor extends PureComponent{
	static displayName="editor"
	static domain="edit"
	static propTypes={
		representation: PropTypes.node.isRequired,
		media: PropTypes.string,

		//props to canvas
		scale: PropTypes.number,
		screenBuffer: PropTypes.oneOfType([PropTypes.func, PropTypes.number]),
		//events to canvas
		onKeyDown: PropTypes.func,
		onContextMenu: PropTypes.func,

		//props to document
		editable: PropTypes.oneOfType([
			PropTypes.bool,
			PropTypes.shape({
				cursor:PropTypes.bool
			})
		]),
	}

	static contextTypes={
		events: PropTypes.object,
		activeDocStore: PropTypes.object,
	}

	static defaultProps={
		media:"screen",
		editable: true,
	}

	static childContextTypes={
		media: PropTypes.string,
	}

	static getDerivedStateFromProps({viewport},state={}){
		return {viewport,...state}
	}

	constructor(){
		super(...arguments)
		this.canvasId=`${uuid()}`
		this.state={}
	}

	getChildContext(){
		const {media, }=this.props
		return {media, }
	}

	render(){
		const {viewport}=this.state
		if(!viewport){//to find container width, height
			return <div ref="viewporter" />
		}

		let {representation, children, canvas=children, editable, contextMenu, ...props}=this.props
		if(typeof(representation)=="string"){
			representation=<Representation type={representation}/>
		}

		return (
			<Fragment>
				{React.cloneElement(
							representation,
							{domain:this.constructor.domain},
							this.createDocument({
								canvasProps:{
									...props,
									id:this.canvasId,
									viewport,
									onContextMenu:e=>{
										this.context.activeDocStore.dispatch(ACTION.UI({contextMenuAt:{left:e.clientX+2, top:e.clientY}}))
										props.onContextMenu?.(e)
									},
								}, 
								canvas, 
								editable
							})
						)
				}
				<ContextMenu contextMenu={contextMenu}/>
			</Fragment>
		)
	}

	createDocument(props){
		return 	<Root {...props}/>
	}

	componentDidMount(){
		if(!this.state.viewport){
			this.initViewport(this.refs.viewporter)
		}
	}

	initViewport(viewporter){
		const container=(function getFrameParent(node){
			const {overflowY,width,height} = window.getComputedStyle(node);
			if(parseInt(width)>0 && parseInt(height)>0)
				return node
			const isScrollable = overflowY !== 'visible' && overflowY !== 'hidden';
			if(isScrollable)
				return node

			if (!node) {
				return null;
			}

			return getFrameParent(node.closest('[style*="overflow"]')) || document.body;
		})(viewporter);
		
		let a=viewporter.parentNode
		const {height}=container.getBoundingClientRect()
		let width=0
		while(a && (width=a.getBoundingClientRect().width)==0){
			a=a.parentNode
		}
		this.setState({viewport:{width:parseInt(width),height:parseInt(height||1056),node:container}})
	}
}

const hashCode=ints=>ints.reduce((s,a)=>s+a,0)

export class WeDocumentStub extends Component{
	static propTypes={
		content:	PropTypes.object.isRequired,
		canvas: 	PropTypes.object,
		canvasProps: PropTypes.object,
		editable: PropTypes.any,
	}
	
	static contextTypes={
		ModelTypes: PropTypes.object,
	}

	static childContextTypes={
		weDocument: PropTypes.node
	}

	getChildContext(){
		return {weDocument:this.getDoc()}
	}

	shouldComponentUpdate({hash}){
		return hash!==this.props.hash
	}

	createWeDocument=memoize((content,ModelTypes)=>{
		function createNode(id){
			const current=content.get(id)
			if(!current){
				debugger
				console.error(`content[id=${id}] doesn't exist`)
			}
			const {type, props, children}=current.toJS()
			if(!type){
				debugger
			}
			let Type=ModelTypes[type[0].toUpperCase()+type.substr(1)]
			if(!Type){
				Type=ModelTypes.Unknown
				console.warn(`[${type}] not found`)
			}
	
			let elChildren=children
			const hashCodes=[]
			if(Type.hashCode){
				hashCodes.push(Type.hashCode(props,content,id))
			} else {
				hashCodes.push(current.hashCode())
			}

			if(Array.isArray(children)){
				elChildren=children.map(a=>createNode(a))
				elChildren.every(a=>hashCodes.push(a.props.hash))
			}
			
			console.debug(`${type}[id=${id}].hashCode=${hashCodes.join(",")}`)
			const el=(<Type
					key={id}
					id={id}
					{...props}
					children={elChildren}
					hash={hashCode(hashCodes)}
				/>)
			if(Type.createElement)
				return Type.createElement(el, content, createNode)
			return el
		}
	
		return createNode("root")
	}, (a,b)=>a===b || shallowEqual(a,b) || a?.equals?.(b))

	createDocument=memoize((content,ModelTypes)=>{
		const doc=this.createWeDocument(content,ModelTypes)
		return React.cloneElement(doc,{content,hash:content.hashCode()})
	},(a,b)=>a===b || shallowEqual.equals(a,b) || shallowEqual(a,b))

	getDoc(){
		const {ModelTypes}=this.context
		const {content, canvas, canvasProps, editable}=this.props
		const doc=this.createDocument(content,ModelTypes)
		return React.cloneElement(doc, {
				editable,
				canvas,
				canvasProps
			})
	}

	render(){
		const {ModelTypes}=this.context
		if(!ModelTypes){
			return <div style={{color:"red", marginTop:100}}>Representation is not installed</div>
		}
		return this.getDoc()
	}
}


const Root=connect(state=>{
	const content=state.get("content")
	return {content, hash: content.hashCode()}
})(WeDocumentStub)

export default Editor
