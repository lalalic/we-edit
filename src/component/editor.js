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
		pgGap:PropTypes.number,
		style:PropTypes.object,
	}

	static defaultProps={
		media:"screen",
		width: typeof(window)=='undefined' ? 10000 : window.innerWidth-20,
		pgGap: 20,
		style: {
			background:"lightgray"
		}
	}

	static childContextTypes={
		media:PropTypes.string,
		width:PropTypes.number.isRequired,
		pgGap:PropTypes.number,
		style:PropTypes.object,
		getCursor: PropTypes.func
	}

	static contextTypes={
		transformer: PropTypes.func
	}

	transformed=new Map()
	
	getChildContext(){
		const {media, width, pgGap, style}=this.props
		const self=this
		return {
			media, width, pgGap, style,
			getCursor(){
				return self.refs.cursor
			}
		}
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
				<Cursor ref="cursor"/>
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
	docId=uuid()
	constructor(){
		super(...arguments)
		this.componentWillReceiveProps(this.props)
	}
	
	getChildContext(){
		return {docId}
	}
	
	componentWillReceiveProps({content,domain}){
		this.doc=createChildElement("root",content,domain)
	}
	
	render(){
		return this.doc
	}
})

function createChildElement(id,content,domain){
	let {type, props, children}=content.get(id).toJS()
	let Child=domain[type[0].toUpperCase()+type.substr(1)]
	return (<Child key={id} id={id}
			{...props}
			children={Array.isArray(children) ? children.map(a=>createChildElement(a,content,domain,id)) : children}
		/>)
}

export default Editor
