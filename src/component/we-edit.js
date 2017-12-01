import React,{Component, Children} from "react"
import PropTypes from "prop-types"

import {createStore} from "state"

import {combineReducers} from "redux"
import {Provider} from "react-redux"
import {WithStore} from "component/with-store"

export class WeEdit extends Component{
	static contextTypes={
		store: PropTypes.object
	}

	constructor(){
		super(...arguments)
		this.store=this.context.store||this.createStore()
	}

	createStore(){
		const {children}=this.props
		let reducers=Children.toArray(children)
			.reduce((reducers,{type})=>{
				if(type && type.reducer){
					let key=Object.keys(type.reducer)[0]
					let reducer=type.reducer[key]
					reducers[key]=WithStore.buildStoreKeyReducer(key,reducer)[key]
				}
				return reducers
			},{})

		return createStore(combineReducers(reducers))
	}

	render(){
		const {store}=this.context
		let {children=[]}=this.props
		children=Children.toArray(children).map((a,i)=>{
			const {type,key}=a
			if(type && type.reducer){
				return <WithStore key={key} storeKey={Object.keys(type.reducer)[0]} children={a}/>
			}else{
				return a
			}
		})

		if(children.length==1)
			children=children[0]

		return <Provider store={this.store} children={<div style={{width:"100%"}}>{children}</div>}/>
	}
}
