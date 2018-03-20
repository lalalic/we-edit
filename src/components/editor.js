import React, {Children, PureComponent, Component} from "react"
import PropTypes from "prop-types"

import {connect, connectAdvanced} from "react-redux"

import {getContent, getChanged, getParentId} from "state/selector"
import Cursor from "state/cursor"
import Input from "input"
import uuid from "tools/uuid"

export class Editor extends Component{
	static displayName="editor"
	static propTypes={
		media:PropTypes.string,
		reCreateDoc:PropTypes.bool,
		channel: PropTypes.node.isRequired,
		style: PropTypes.object,
		
		//canvas props for svg
		scale: PropTypes.number,
		canvasStyle: PropTypes.object,
		screenBuffer: PropTypes.oneOfType([PropTypes.func, PropTypes.number]),
	}

	static defaultProps={
		media:"screen",
		scale:1,
	}

	static childContextTypes={
		media:PropTypes.string,
		docId: PropTypes.string,
	}
	
	docId=`${uuid()}`
	getChildContext(){
		const {media}=this.props
		return {media, docId:this.docId}
	}

	render(){
		const {media, channel, style, children:canvas, ...props}=this.props
		return React.cloneElement(channel,
			{domain:this.constructor.displayName},
			<Root style={style} docId={this.docId} canvasProps={{canvas, ...props}}/>
		)
	}
}

const Root=connect((state)=>{
	return {content:state.get("content"),changed: getChanged(state)}
})(class extends PureComponent{
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

		//first handle with children changed
		let changedKeys=Object.keys(changed).reduce((sorted,a)=>{
				sorted[a.children ? "push" : "unshift"](a)
				return sorted
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
		if(reCreateDoc || !this.doc){
			this.els=new Map()
			this.doc=this.createChildElement("root",content,ModelTypes,this.props.content,canvasProps)
		}else if(this.props.content!=content){
			if(!changed){
				this.doc=this.createChildElement("root",content,ModelTypes,this.props.content,canvasProps)
			}else{
				this.modifyDocOnChanged(content,changed,ModelTypes)
				this.doc=React.cloneElement(this.doc,canvasProps)
			}
		}else{
			this.doc=React.cloneElement(this.doc,  canvasProps)
		}
	}

	createChildElement(id,content,ModelTypes,lastContent, canvasProps={}){
		let current=content.get(id)
		let {type, props, children}=current.toJS()
		let Child=ModelTypes[type[0].toUpperCase()+type.substr(1)]
		if(!Child){
			console.error(`[${type}] not found`)
			return null
		}
		let elChildren=children

		if(Array.isArray(children))
			elChildren=children.map(a=>{
				return this.createChildElement(a,content,ModelTypes,lastContent)
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
				{...canvasProps}
				children={elChildren}
				changed={changed}
				selfChanged={selfChanged}
			/>)

		this.els.set(id,el)

		return el
	}

	render(){
		return <div id={this.props.docId} style={this.props.style}>{this.doc}</div>
	}
})

export default Editor
