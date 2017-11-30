import React, {Children, PureComponent, Component} from "react"
import PropTypes from "prop-types"

import {connect, connectAdvanced} from "react-redux"

import Models from "model"

import {getContent, getChanged, getParentId} from "state/selector"
import Cursor from "state/cursor"
import Input from "input"
import uuid from "tools/uuid"

export class Editor extends Component{
	static displayName="editor"
	static propTypes={
		media:PropTypes.string,
		width:PropTypes.number.isRequired,
		height:PropTypes.number,
		pgGap:PropTypes.number,
		style:PropTypes.object,
	}

	static defaultProps={
		media:"screen",
		width: typeof(window)=='undefined' ? 1 : window.innerWidth-20,
		height: typeof(window)=='undefined' ? 1 : window.innerHeight,
		pgGap: 20,
		style: {
			background:"lightgray"
		}
	}

	static childContextTypes={
		media:PropTypes.string,
		viewport:PropTypes.shape({
			width:PropTypes.number.isRequired,
			height:PropTypes.number,
		}),
		pgGap:PropTypes.number,
		style:PropTypes.object
	}

	static contextTypes={
		transformer: PropTypes.func
	}

	transformed=new Map()

	getChildContext(){
		const {media, width, pgGap, style,height}=this.props
		return {media, viewport:{width,height}, pgGap, style}
	}
	render(){
		let transform=this.context.transformer||(a=>a)
		return (
			<div className={this.constructor.displayName}>
			{
				Children.map(this.props.children,({props:{domain}},i)=>{
					domain=domain(this.constructor.displayName)
					if(!this.transformed.has(domain))
						this.transformed.set(domain, transform(domain))
					domain=this.transformed.get(domain)

					return (<Root key={i} domain={domain}/>)
				})
			}
			</div>
		)
	}
}

const Root=connect((state,{domain})=>{
	return {content:state.get("content"),changed: getChanged(state),domain}
})(class extends PureComponent{
	static childContextTypes={
		docId: PropTypes.string
	}
	docId=`editor_${uuid()}`
	constructor(){
		super(...arguments)
		this.els=new Map()
		this.componentWillReceiveProps(this.props)
	}

	getChildContext(){
		return {
			docId:this.docId
		}
	}

	componentWillReceiveProps({content,changed,domain}){
		if(false && this.doc && changed){ // editing
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
							el=this.createChildElement(j,content,domain,this.props.content)
							handled.push(j)
						}
						if(el){
							els.push(el)
							this.els.set(j,el)
						}else{
							el=this.createChildElement(j,content,domain,this.props.content)
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
					children[index]=this.createChildElement(k,content,domain,this.props.content)
					changeParent(parentId);
				}
				return handled
			},[])
		}else{//reproduce mode
			this.els=new Map()
			this.doc=this.createChildElement("root",content,domain,this.props.content)
		}
	}

	createChildElement(id,content,domain,lastContent){
		let current=content.get(id)
		let {type, props, children}=current.toJS()
		let Child=domain[type[0].toUpperCase()+type.substr(1)]	
		if(!Child){
			console.error(`[${type}] not found`)
			return null
		}
		let elChildren=children

		if(Array.isArray(children))
			elChildren=children.map(a=>{
				return this.createChildElement(a,content,domain,lastContent)
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

		this.els.set(id,el)

		return el
	}

	render(){
		return <div id={this.docId}>{this.doc}</div>
	}
})

export default Editor
