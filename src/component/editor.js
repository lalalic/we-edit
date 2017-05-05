import React, {Children, PureComponent, Component, PropTypes} from "react"
import {connect, connectAdvanced} from "react-redux"

import Models from "model"

import {getContent} from "state/selector"
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
	return {content:state.get("content"),domain}
})(class extends PureComponent{
	static childContextTypes={
		docId: PropTypes.string
	}
	docId=`editor_${uuid()}`
	constructor(){
		super(...arguments)
		this.componentWillReceiveProps(this.props)
	}

	getChildContext(){
		return {
			docId:this.docId
		}
	}
	
	componentWillReceiveProps({content,domain}){
		this.doc=createChildElement("root",content,domain,this.props.content)
	}

	render(){
		return <div id={this.docId}>{this.doc}</div>
	}
})

function createChildElement(id,content,domain,lastContent){
	let current=content.get(id)
	let {type, props, children}=current.toJS()
	let Child=domain[type[0].toUpperCase()+type.substr(1)]
	let elChildren=children
	
	if(Array.isArray(children))
		elChildren=children.map(a=>createChildElement(a,content,domain,lastContent))
	
	let changed=false
	
	if(lastContent){
		let last=lastContent.get(id)
		
		if(current!=last){
			changed=true
		}else if(Array.isArray(children)){
			changed=!!elChildren.find(({props:{changed}})=>changed)
		}
	}
	
	return (<Child 
			key={id} 
			id={id}
			{...props}
			children={elChildren}
			changed={changed}
		/>)
}

export default Editor
