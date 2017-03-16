import React, {Children, Component, PropTypes} from "react"
import {createStore, applyMiddleware,compose} from "redux"
import {Provider, connect} from "react-redux"
import immutable from "immutable"

import Models from "model"
import {getContent} from "state/selector"
import Input from "input"

const STATEFUL=new Map()

export class Editor extends Component{
	static propTypes={
		url: PropTypes.string
	}
	state={doc:null}
	
	render(){
		const {doc}=this.state
		if(!doc)
			return "loading"
		
		return (
			<Provider store={this.store}>
				{
				Children.map(this.props.children,(i,{props:{domain}})=>{
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
			</Provider>
		)
	}
	
	load(){
		Input.load(this.props.url).then(doc=>{
			this.setState({doc})
		})
	}
	
	get store(){
		return createStore(
			function(state,payload){
				
			}, 
			Immutable.fromJS({
				content:null,
				selection:null,
				file:null
			})
		)
	}
}

function stateful(Model){
	return connect((state,{id})=>{
		let {props}=getContent(state,id)
		return props
	})(Model)
}

export default Editor