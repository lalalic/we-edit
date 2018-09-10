import React, {Children, PureComponent, Component} from "react"
import PropTypes from "prop-types"
import memoize from "memoize-one"

import {connect} from "react-redux"

import Representation from "./representation"
import {getContent, getChanged, getParentId} from "../state/selector"
import Cursor from "./cursor"
import Input from "../input"
import uuid from "../tools/uuid"

export class Editor extends PureComponent{
	static displayName="editor"
	static domain="edit"
	static propTypes={
		media:PropTypes.string,
		reCreateDoc:PropTypes.bool,
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
		reCreateDoc: true,
	}

	static childContextTypes={
		media:PropTypes.string,
		docId: PropTypes.string,
	}

	constructor(){
		super(...arguments)
		this.docId=`${uuid()}`
		this.getTypedRepresentation=memoize(this.getTypedRepresentation.bind(this))
	}
	getChildContext(){
		const {media}=this.props
		return {media, docId:this.docId}
	}

	render(){
		const {media, representation, reCreateDoc, scale, screenBuffer, children:canvas, viewport, ...props}=this.props
		const TypedRepresentation=this.getTypedRepresentation(representation)
		if(!TypedRepresentation)
			return null

		return React.cloneElement(
			TypedRepresentation,
			{domain:this.constructor.domain},
			this.createDocument({docId:this.docId, reCreateDoc, canvasProps:{canvas, scale, screenBuffer,viewport, ...props}})
		)
	}

	getTypedRepresentation(representation){
		let TypedRepresentation=null
		if(typeof(representation)=="string"){
			TypedRepresentation=Representation.get(representation)
			if(TypedRepresentation){
				return <TypedRepresentation/>
			}
		}else if(React.isValidElement(representation)){
			let {props:{type, ...others}}=representation
			if(type){
				TypedRepresentation=Representation.get(type)
			}
			if(TypedRepresentation){
				return <TypedRepresentation {...others}/>
			}
		}


		return representation
	}

	createDocument(props){
		return 	<Root {...props}/>
	}

}

export function createWeDocument(id,content,ModelTypes,lastContent, onElCreate){
	let current=content.get(id)
	let {type, props, children}=current.toJS()
	if(!type){
		debugger
	}
	let Child=ModelTypes[type[0].toUpperCase()+type.substr(1)]
	if(!Child){
		console.error(`[${type}] not found`)
		return null
	}
	let elChildren=children

	if(Array.isArray(children))
		elChildren=children.map(a=>{
			return createWeDocument(a,content,ModelTypes,lastContent,onElCreate)
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

	let el=(<Child
			key={id}
			id={id}
			{...props}
			children={elChildren}
			changed={changed}
			selfChanged={selfChanged}
		/>)

	if(onElCreate){
		onElCreate(el)
	}
	return el
}


class WeDocumentStub extends PureComponent{
	static contextTypes={
		ModelTypes: PropTypes.object
	}

	constructor(){
		super(...arguments)
		this.els=new Map()
		this.componentWillReceiveProps(this.props,this.context)
	}

	modifyDocOnChanged(content,changed,ModelTypes){
		const getThisParentId=id=>getParentId(content,id)

		const changeParent=id=>{
			let el=this.els.get(id)
			let changed=React.cloneElement(el,{changed:true})

			let parentId=getThisParentId(id)
			if(parentId){
				let parentEl=this.els.get(parentId)
				let children=parentEl.props.children
				let index=content.get(parentId).toJS().children.indexOf(id)
				children[index]=changed
				changeParent(parentId)
			}else{
				this.doc=changed
			}
		}

		let changedKeys=Object.keys(changed)
			.reduce((sorted,a)=>{//first handle with children changed
				sorted[a.children ? "push" : "unshift"](a)
				return sorted
			},[])
			.reduce((filtered,a, i, all)=>{
				//if parent is changed, then children would not be handle here
				let parent=getThisParentId(a)
				while(parent){
					if(all.includes(parent)){
						return filtered
					}else{
						parent=getThisParentId(parent)
					}
				}
				filtered.push(a)
				return filtered
			},[])

		changedKeys.reduceRight((handled, k)=>{
			let children=changed[k].children
			if(children){
				let {props:{children:els}}=this.els.get(k)
				els.forEach(({props:{id}})=>{
					this.els.delete(id)
				})
				let rawEls=els.splice(0,els.length)

				children.forEach(j=>{
					let el=rawEls.find(({props:{id}})=>id==j)
					if(changedKeys.includes(j)){
						el=this.createChildElement(j,content,ModelTypes,this.props.content)
						handled.push(j)
					}
					if(el){
						els.push(el)
						this.els.set(j,el)
					}else{
						el=this.createChildElement(j,content,ModelTypes,this.props.content)
						handled.push(j)
						els.push(el)
					}
				})
				changeParent(k)
			}else if(!handled.includes(k)){
				let parentId=getThisParentId(k)
				let parentEl=this.els.get(parentId)

				children=parentEl.props.children
				let index=content.get(parentId).toJS().children.indexOf(k)
				children[index]=this.createChildElement(k,content,ModelTypes,this.props.content)
				changeParent(parentId);
			}
			return handled
		},[])
	}

	componentWillReceiveProps({content,changed,reCreateDoc,canvasProps},{ModelTypes}){
		if(!ModelTypes)
			return
		if(!this.doc){
			this.els=new Map()
			this.doc=this.createChildElement("root",content,ModelTypes)
		}else if(this.props.content!=content){
			if(reCreateDoc || !changed || (changed&&(changed.root || Object.keys(changed).length>1))){
				this.doc=this.createChildElement("root",content,ModelTypes,this.props.content)
			}else{//deprecated
				this.modifyDocOnChanged(content,changed,ModelTypes)
			}
		}

		this.doc=React.cloneElement(this.doc,  {...canvasProps})
	}

	createChildElement(id,content,ModelTypes,lastContent){
		return createWeDocument(
			id,content,ModelTypes,lastContent,
			el=>{this.els.set(el.props.id,el)}
		)
	}

	render(){
		if(!this.context.ModelTypes){
			return <div style={{color:"red", marginTop:100}}>Representation is not installed</div>
		}
		return this.doc

	}
}


const Root=connect((state)=>{
	return {content:state.get("content"),changed: getChanged(state)}
})(WeDocumentStub)

export default Editor
