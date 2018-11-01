import React, {Fragment, Children, PureComponent, Component} from "react"
import PropTypes from "prop-types"

import {connect} from "../state"

import Representation from "./representation"
import {getContent, getParentId} from "../state/selector"
import Cursor from "./cursor"
import Input from "../input"
import uuid from "../tools/uuid"

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
		})
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
		docId: PropTypes.string,
	}

	constructor(){
		super(...arguments)
		this.docId=`${uuid()}`
	}
	getChildContext(){
		const {media}=this.props
		return {media, docId:this.docId}
	}

	render(){
		let {media, representation, scale, screenBuffer, children:canvas, viewport, ...props}=this.props
		if(typeof(representation)=="string"){
			representation=<Representation type={representation}/>
		}

		return React.cloneElement(
			representation,
			{domain:this.constructor.domain},
			this.createDocument({docId:this.docId, canvasProps:{canvas, scale, screenBuffer,viewport, ...props}})
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

		if(current!=last){
			changed=true
		}else if(Array.isArray(children)){
			changed=!!elChildren.find(({props:{changed}})=>changed)
		}

		if(Array.isArray(children)){
			selfChanged=last && current.get("props")!=last.get("props")
		}else{
			selfChanged=changed
		}
	}

	return(<Child
			key={id}
			id={id}
			{...props}
			children={elChildren}
			changed={changed}
			selfChanged={selfChanged}
		/>)
}


class WeDocumentStub extends PureComponent{
	static contextTypes={
		ModelTypes: PropTypes.object
	}

	constructor(){
		super(...arguments)
		this.componentWillReceiveProps(this.props,this.context)
	}

	componentWillReceiveProps({content,canvasProps},{ModelTypes}){
		if(!ModelTypes)
			return
		if(!this.doc){
			this.doc=this.createChildElement("root",content,ModelTypes)
		}else if(this.props.content!=content){
			this.doc=this.createChildElement("root",content,ModelTypes,this.props.content)
		}

		this.doc=React.cloneElement(this.doc,  {...canvasProps, content})
	}

	createChildElement(id,content,ModelTypes,lastContent){
		return createWeDocument(id,content,ModelTypes,lastContent)
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

export default Editor
