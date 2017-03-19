import React, {Children, Component, PropTypes} from "react"
import {connect} from "react-redux"

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
		style:PropTypes.object
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
						let Document=STATEFUL.get(domain).Document
						return <Document id="root" key={i}/>
					}else
						return "not supported!"
				})
				}
			</div>
		)
	}
}

function stateful(Model, domain){
	return connect((state,{id,children:currentChildren=[]})=>{
		console.log(`${Model.displayName}[${id}] connecting`)
		const {props,children=[]}=getContent(state,id).toJS()

		if(!Array.isArray(children))
			return {...props, id, children}

		return {
			...props,
			children: children.map(id=>{
					let {type, props, children}=getContent(state,id).toJS()
					let Child=domain[type[0].toUpperCase()+type.substr(1)]
					return <Child key={id} id={id}
						{...props}
						{...(Array.isArray(children) ? null : {children})}
						/>
				})
		}
	})(Model)
}

export default Editor
