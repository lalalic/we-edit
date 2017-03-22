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

	getChildContext(){
		const {media, width, pgGap, style}=this.props
		return {media, width, pgGap, style}
	}
	render(){
		return (
			<div className={this.constructor.displayName}>
			{
				Children.map(this.props.children,({props:{domain}},i)=>
					<Root key={i} domain={domain(this.constructor.displayName)}/>
				)
			}
			</div>
		)
	}
}

const Root=connect((state,{domain})=>{
	return {doc:createChildElement("root",state,domain)}
},null,stateProps=>stateProps)(({doc})=>doc)

function createChildElement(id,state,domain,pid){
	let content=getContent(state,id)
	let {type, props, children}=content.toJS()
	let Child=domain[type[0].toUpperCase()+type.substr(1)]
	return (<Child key={id} id={id}
			{...props}
			children={Array.isArray(children) ? children.map(a=>createChildElement(a,state,domain,id)) : children}
		/>)
}

export default Editor
