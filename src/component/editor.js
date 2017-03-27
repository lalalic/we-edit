import React, {Children, Component, PropTypes} from "react"
import {connect, connectAdvanced} from "react-redux"

import Models from "model"

import {getContent} from "state/selector"
import Input from "input"

export class Editor extends Component{
	static displayName="editor"
	static propTypes={
		media:PropTypes.string,
		width:PropTypes.number.isRequired,
		pgGap:PropTypes.number,
		style:PropTypes.object
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
		style:PropTypes.object
	}
	
	static contextTypes={
		transformer: PropTypes.func
	}
	
	constructor(){
		super(...arguments)
		this.transformed=new Map()
	}

	getChildContext(){
		const {media, width, pgGap, style}=this.props
		return {media, width, pgGap, style}
	}
	render(){
		let transform=this.context.transformer
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
	return {doc:createChildElement("root",state,domain)}
},null,stateProps=>stateProps)(({doc})=>doc)

function createChildElement(id,state,domain){
	let content=getContent(state,id)
	let {type, props, children}=content.toJS()
	let Child=domain[type[0].toUpperCase()+type.substr(1)]
	return (<Child key={id} id={id}
			{...props}
			children={Array.isArray(children) ? children.map(a=>createChildElement(a,state,domain,id)) : children}
		/>)
}

export default Editor
