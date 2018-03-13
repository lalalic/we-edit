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
		pgGap:PropTypes.number,
		fullReCompose:PropTypes.bool,
	}

	static defaultProps={
		media:"screen",
		pgGap: 24
	}

	static childContextTypes={
		media:PropTypes.string,
		pgGap:PropTypes.number
	}

	getChildContext(){
		const {media, pgGap}=this.props
		return {media, pgGap}
	}

	render(){
		const {fullReCompose, children, channel, ...props}=this.props
		return (
			<div className={this.constructor.displayName}>
			{
				React.cloneElement(channel,{
					domain:this.constructor.displayName,
					children: (<Root fullReCompose={fullReCompose} {...props}/>)
				})
			}
			</div>
		)
	}
}

const Root=connect((state)=>{
	return {content:state.get("content"),changed: getChanged(state)}
})(class extends PureComponent{
	static childContextTypes={
		docId: PropTypes.string
	}
	static contextTypes={
		ModelTypes: PropTypes.object
	}

	docId=`editor_${uuid()}`
	constructor(){
		super(...arguments)
		this.els=new Map()
		this.componentWillReceiveProps(this.props,this.context)
	}

	getChildContext(){
		return {
			docId:this.docId
		}
	}

	componentWillReceiveProps({content,changed,fullReCompose,...renderProps},{ModelTypes}){
		if(!fullReCompose && this.doc && changed){ // editing
			//&& content.size>50){ // big
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
		}else{//reproduce mode
			this.els=new Map()
			this.doc=this.createChildElement("root",content,ModelTypes,this.props.content,renderProps)
		}
	}

	createChildElement(id,content,ModelTypes,lastContent, renderProps={}){
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
				{...renderProps}
				children={elChildren}
				changed={changed}
				selfChanged={selfChanged}
			/>)

		this.els.set(id,el)

		return el
	}

	render(){
		return <div id={this.docId}>{this.doc}</div>
	}
})

export default Editor
