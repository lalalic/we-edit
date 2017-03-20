import React, {Children, Component, PropTypes} from "react"
import {connect, connectAdvanced} from "react-redux"

import Models from "model"

import {getContent} from "state/selector"
import Input from "input"

const STATEFUL=new Map()

export class Editor extends Component{
	static propTypes={
		media:PropTypes.string,
		width:PropTypes.number.isRequired,
		pgGap:PropTypes.number,
		style:PropTypes.object
	}

	static defaultProps={
		media:"browser",
		width: typeof(window)=='undefined' ? 10000 : window.innerWidth,
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
		dispatch: PropTypes.func
	}

	getChildContext(){
		const {media, width, pgGap, style}=this.props
		return {media, width, pgGap, style}
	}
	render(){
		return (
			<div className="editor">
				{
				Children.map(this.props.children,({props:{domain}},i)=>{
					domain=domain("editor")
					if(!STATEFUL.has(domain)){
						STATEFUL.set(
							domain,
							Object.keys(Models).reduce((converted,key)=>{
								converted[key]=stateful(converted[key],converted)
								return converted
							},{...domain})
						)
					}
					if(STATEFUL.has(domain)){
						return <Root key={i} domain={STATEFUL.get(domain)}/>
					}else
						return "not supported!"
				})
				}
			</div>
		)
	}
}

const Root=connect((state,{domain})=>{
	let doc=createChildElement("root",state,domain)
	return state=>({doc})
},null,stateProps=>stateProps)(({doc})=>doc)

function createChildElement(id,state,domain){
	let content=getContent(state,id)
	let {type, props, children}=content.toJS()
	let Child=domain[type[0].toUpperCase()+type.substr(1)]
	return (<Child key={id} id={id} content={content}
			{...props}
			children={Array.isArray(children) ? children.map(a=>createChildElement(a,state,domain)) : children}
		/>)
}

function stateful(Model, domain){
	return connect((state,currentProps)=>{
		const {id,children:currentChildren=[],content:currentContent}=currentProps
		console.log(`${Model.displayName}[${id}] connecting`)
		
		const content=getContent(state,id)
		
		if(currentContent==content)
			return currentProps
		
		const {props,children=[]}=content.toJS()
		
		console.log(`${Model.displayName}[${id}] connected`)
		
		if(!Array.isArray(children))
			return {...props, id, children, content}

		return {
			...props,
			children: children.map(a=>createChildElement(a,state,domain))
		}
	})(Model)
}

export default Editor
