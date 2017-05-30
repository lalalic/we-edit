import React, {Children, PureComponent, Component, PropTypes} from "react"
import {connect, connectAdvanced} from "react-redux"

import Models from "model"

import {getContent, getChanged} from "state/selector"
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
		this.parents=new Map()
		this.componentWillReceiveProps(this.props)
	}

	getChildContext(){
		return {
			docId:this.docId
		}
	}

	changedType(id,current,last){
		return {
			"10":"delete",
			"11":"update",
			"01":"create"
		}[`${last.has(id)&&1||0}${current.has(id)&&1||0}`]
	}

	componentWillReceiveProps({content,changed,domain}){
		//return this.doc=this.createChildElement("root",content,domain,this.props.content)

		if(this.doc // editing
			&& content.size>50 // big
			){//replace mode

			if(changed.size>1){
				let children=new Set()
				changed.forEach(k=>{
					let thisChildren=content.get(k).get("children")
					if(thisChildren)
						thisChildren.toJS()
							.forEach(a=>children.add(a))
				})
				changed.forEach(k=>children.has(k) && changed.delete(k))
			}

			const changeParent=id=>{
				let el=this.els.get(id)
				let changed=React.cloneElement(el,{changed:true})

				let parentId=this.parents.get(id)
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

			changed.forEach(k=>{
				switch(this.changedType(k,content,this.props.content)){
					case "delete":{
						let parentId=this.parents.get(k)
						let parentEl=this.els.get(parentId)
						let children=parentEl.props.children
						let index=this.props.content.get(parentId).toJS().children.indexOf(k)
						children.splice(index,1)
						changeParent(parentId)
						break
					}
					case "update":{
						let parentId=this.parents.get(k)
						let parentEl=this.els.get(parentId)
						let children=parentEl.props.children
						let index=content.get(parentId).toJS().children.indexOf(k)
						children[index]=this.createChildElement(k,content,domain,this.props.content)
						changeParent(parentId);
						break
					}
					case "create":{
						let parentId=this.parents.get(k)
						let parentEl=this.els.get(parentId)
						let children=parentEl.props.children
						let index=this.props.content.get(parentId).toJS().children.indexOf(k)
						children.splice(index,1)
						changeParent(parentId)
						break
					}
				}
			})
		}else{//reproduce mode
			this.els=new Map()
			this.parents=new Map()
			this.doc=this.createChildElement("root",content,domain,this.props.content)
		}
	}

	createChildElement(id,content,domain,lastContent){
		let current=content.get(id)
		let {type, props, children}=current.toJS()
		let Child=domain[type[0].toUpperCase()+type.substr(1)]
		let elChildren=children

		if(Array.isArray(children))
			elChildren=children.map(a=>{
				this.parents.set(a,id)
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
