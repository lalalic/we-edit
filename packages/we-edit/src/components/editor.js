import React, {PureComponent, Component,Fragment} from "react"
import PropTypes from "prop-types"

import {connect} from "../state"
import Representation from "./representation"
import uuid from "../tools/uuid"
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
		scale:1,
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

export function createWeDocument(id,content,ModelTypes,lastContent){
	let current=content.get(id)
	let {type, props, children}=current.toJS()
	if(!type){
		debugger
	}
	let Child=ModelTypes[type[0].toUpperCase()+type.substr(1)]
	if(!Child){
		Child=ModelTypes.Unknown
		console.warn(`[${type}] not found`)
	}
	let elChildren=children

	if(Array.isArray(children))
		elChildren=children.map(a=>{
			return createWeDocument(a,content,ModelTypes,lastContent)
		})

	let changed=false, selfChanged=false

	if(lastContent){
		let last=lastContent.get(id)

		changed=!current.equals(last)

		if(!changed && Array.isArray(children)){
			changed=!!elChildren.find(({props:{changed}})=>changed)
		}
	}

	return(<Child
			key={id}
			id={id}
			{...props}
			children={elChildren}
			changed={changed}
		/>)
}


export class WeDocumentStub extends Component{
	static contextTypes={
		ModelTypes: PropTypes.object
	}

	static childContextTypes={
		weDocument: PropTypes.node
	}

	constructor(){
		super(...arguments)
		this.componentWillReceiveProps(this.props,this.context)
	}

	getChildContext(){
		return {weDocument:this.doc}
	}

	shouldComponentUpdate(props){
		if(shallowEqual(props, this.props)){
			return false
		}else{
			const {content,...next}=props
			const {content:last, ...current}=this.props
			if(shallowEqual(next,current) && content.equals(last)){
				return false
			}
		}
		
		return true
	}

	componentWillReceiveProps({content,canvasProps,canvasId},{ModelTypes}){
		if(!ModelTypes)
			return
		if(!this.doc){
			this.doc=createWeDocument("root",content,ModelTypes)
		}else if(!content.equals(this.props.content)){
			this.doc=createWeDocument("root",content,ModelTypes,this.props.content)
		}else{
			content=this.props.content//make shallowEquals works for descandents
		}

		this.doc=React.cloneElement(this.doc,  {
			canvasId,
			...canvasProps,
			canvas:canvasProps.canvas||<Dummy/>,//default empty canvas to 
			content,
		})
	}

	render(){
		if(!this.context.ModelTypes){
			return <div style={{color:"red", marginTop:100}}>Representation is not installed</div>
		}
		return this.doc

	}
}


const Root=connect((state)=>{
	return {content:state.get("content")}
})(WeDocumentStub)

const Dummy=({content})=><Fragment>{content}</Fragment>

export default Editor
