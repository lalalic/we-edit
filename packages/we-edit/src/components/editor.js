import React, {PureComponent, Component,Fragment} from "react"
import PropTypes from "prop-types"

import {connect} from "../state"
import Representation from "./representation"
import uuid from "../tools/uuid"
import memoize from "memoize-one"
import shallowEqual from "../tools/shallow-equal"

export class Editor extends PureComponent{
	static displayName="editor"
	static domain="edit"
	static propTypes={
		media:PropTypes.string,
		representation: PropTypes.node.isRequired,

		//canvas props for svg
		scale: PropTypes.number,
		screenBuffer: PropTypes.oneOfType([PropTypes.func, PropTypes.number]),
		viewport: PropTypes.shape({
			width: PropTypes.number,
			height: PropTypes.number
		}),

		//events
		onKeyDown: PropTypes.func,
		onContextMenu: PropTypes.func,
	}

	static contextTypes={
		events: PropTypes.object
	}

	static defaultProps={
		media:"screen",
		scale:1
	}

	static childContextTypes={
		media:PropTypes.string,
		onKeyDown: PropTypes.func,
		onContextMenu: PropTypes.func,
	}

	constructor(){
		super(...arguments)
		this.canvasId=`${uuid()}`
	}

	getChildContext(){
		const {media,onKeyDown, onContextMenu}=this.props
		return {media,onKeyDown, onContextMenu}
	}

	render(){
		let {media, representation, scale, screenBuffer, children:canvas, viewport, ...props}=this.props
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

}

const hashCode=ints=>ints.reduce((s,a)=>s+a,0)

export const createWeDocument=memoize(function(content,ModelTypes){
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
		const Child=ModelTypes[type[0].toUpperCase()+type.substr(1)]
		if(!Child){
			Child=ModelTypes.Unknown
			console.warn(`[${type}] not found`)
		}

		let elChildren=children
		const hashCodes=[current.hashCode()]
		if(Array.isArray(children)){
			elChildren=children.map(a=>createNode(a))
			elChildren.every(a=>hashCodes.push(a.props.hash))
		}

		return(<Child
				key={id}
				id={id}
				{...props}
				children={elChildren}
				hash={hashCode(hashCodes)}
			/>)
	}

	return createNode("root")
}, (a,b)=>a===b || shallowEqual.equals(a,b))


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

	createDocument=memoize((canvasId, content, canvasProps,ModelTypes)=>{
		return React.cloneElement(createWeDocument(content,ModelTypes),{
			canvasId,
			...canvasProps,
			canvas:canvasProps.canvas||defaultCanvas,//default empty canvas to 
			content,
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


const Root=connect((state)=>{
	return {content:state.get("content")}
})(WeDocumentStub)

const Dummy=({content})=><Fragment>{content}</Fragment>
const defaultCanvas=<Dummy/>

export default Editor
