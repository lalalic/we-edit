import React, {PureComponent, Component} from "react"
import PropTypes from "prop-types"

import {connect,ACTION} from "../state"
import Representation from "./representation"
import uuid from "../tools/uuid"
import memoize from "memoize-one"
import shallowEqual from "../tools/shallow-equal"

export class Editor extends PureComponent{
	static displayName="editor"
	static domain="edit"
	static propTypes={
		representation: PropTypes.node.isRequired,
		media: PropTypes.string,

		//canvas props for svg
		scale: PropTypes.number,
		screenBuffer: PropTypes.oneOfType([PropTypes.func, PropTypes.number]),
		viewport: PropTypes.shape({
			width: PropTypes.number,
			height: PropTypes.number,
			node: PropTypes.instanceOf(Element),
		}),

		editable: PropTypes.oneOfType([
			PropTypes.bool,
			PropTypes.shape({
				cursor:PropTypes.bool
			})
		]),

		//events
		onKeyDown: PropTypes.func,
		onContextMenu: PropTypes.func,
	}

	static contextTypes={
		events: PropTypes.object
	}

	static defaultProps={
		media:"screen"
	}

	static childContextTypes={
		media: PropTypes.string,
		onKeyDown: PropTypes.func,
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
		const {media, onKeyDown}=this.props
		return {media,onKeyDown}
	}

	render(){
		const {viewport}=this.state
		if(!viewport){//to find container width, height
			return <div ref="viewporter" />
		}

		var {representation, scale, screenBuffer, children:canvas,viewport:_1, ...props}=this.props
		if(typeof(representation)=="string"){
			representation=<Representation type={representation}/>
		}

		return React.cloneElement(
			representation,
			{domain:this.constructor.domain},
			this.createDocument({canvasId:this.canvasId, canvasProps:{canvas, scale, screenBuffer,viewport, ...props}})
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
		const setViewport=()=>{
			const {height}=container.getBoundingClientRect()
			let width=0
			while(a && (width=a.getBoundingClientRect().width)==0){
				a=a.parentNode
			}
			this.setState({viewport:{width:parseInt(width),height:parseInt(height||1056),node:container}})
		}

		setViewport()

		;(function() {
			var throttle = function(type, name, obj) {
				obj = obj || window;
				var running = false;
				var func = function() {
					if (running) { return; }
					running = true;
					 requestAnimationFrame(function() {
						obj.dispatchEvent(new CustomEvent(name));
						running = false;
					});
				};
				obj.addEventListener(type, func);
			};
		
			/* init - you can init any event */
			throttle("resize", "optimizedResize");
			window.addEventListener("optimizedResize",setViewport)
		})();
	}

	get viewport(){
		return this.state.viewport
	}
}

const hashCode=ints=>ints.reduce((s,a)=>s+a,0)

export class WeDocumentStub extends Component{
	static contextTypes={
		ModelTypes: PropTypes.object
	}

	static childContextTypes={
		weDocument: PropTypes.node
	}

	getChildContext(){
		return {weDocument:this.getDoc()}
	}

	shouldComponentUpdate(props){
		if(shallowEqual(props, this.props)){
			return false
		}else{
			const {content,...next}=props
			const {content:last, ...current}=this.props
			if(shallowEqual.equals(content,last) && shallowEqual(next,current)){
				return false
			}
		}
		
		return true
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
			let Child=ModelTypes[type[0].toUpperCase()+type.substr(1)]
			if(!Child){
				Child=ModelTypes.Unknown
				console.warn(`[${type}] not found`)
			}
	
			let elChildren=children
			const hashCodes=[Child.hashCode ? Child.hashCode(props,content,id) : current.hashCode()]
			if(Array.isArray(children)){
				elChildren=children.map(a=>createNode(a))
				elChildren.every(a=>hashCodes.push(a.props.hash))
			}
	
			const el=(<Child
					key={id}
					id={id}
					{...props}
					children={elChildren}
					hash={hashCode(hashCodes)}
				/>)
			if(Child.createElement)
				return Child.createElement(el, content, createNode)
			return el
		}
	
		return createNode("root")
	}, (a,b)=>a===b || shallowEqual(a,b) || a?.equals?.(b))

	createDocument=memoize((canvasId, content, canvasProps,ModelTypes)=>{
		const doc=this.createWeDocument(content,ModelTypes)
		return React.cloneElement(doc,{
			canvasId,
			onContextMenu:e=>this.props.dispatch(ACTION.UI({contextMenuAt:{left:e.clientX+2, top:e.clientY}})),
			...canvasProps,
			canvas:canvasProps.canvas,//||defaultCanvas,//default empty canvas to 
			content,
			contentHash:content.hashCode(),
		})
	},(a,b)=>a===b || shallowEqual.equals(a,b) || shallowEqual(a,b))

	getDoc(){
		const {ModelTypes}=this.context
		const {content, canvasProps, canvasId}=this.props
		return this.createDocument(canvasId,content,canvasProps,ModelTypes)
	}

	render(){
		const {ModelTypes}=this.context
		if(!ModelTypes){
			return <div style={{color:"red", marginTop:100}}>Representation is not installed</div>
		}
		return this.getDoc()
	}
}


const Root=connect(
	(state)=>({content:state.get("content")}),
	null,
	null,
	{
		areStatePropsEqual(a,b){
			return a.content.equals(b.content)
		}
	}
)(WeDocumentStub)


export default Editor
