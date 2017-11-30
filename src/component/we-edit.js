import React,{Component, Children} from "react"
import PropTypes from "prop-types"

import {createStore} from "state"

import {combineReducers} from "redux"
import {Provider} from "react-redux"

import {reducer} from ".."

export class WeEdit extends Component{
	static contextTypes={
		store: PropTypes.object
	}
	
	static propTypes={
		store: PropTypes.object,
		getState: PropTypes.func
	}
	
	static reducer={
		WeEdit(state={version:"1.0"}, action){
			return state
		}
	}
	
	constructor(){
		super(...arguments)
		this.store=this.context.store||this.createStore()
	}
	
	createStore(){
		const {children}=this.props
		let reducers=Children.toArray(children)
			.reduce((reducers,a)=>{
				if(a.reducer)
					return {...reducers, ...a.reducer}
				return reducers
			},{...WeEdit.reducer})
			
		this.store=createStore(combineReducers(reducers))
	}
	
	render(){
		const {store}=this.context
		if(store){
			return (
				<div>
				{this.props.children}
				</div>
			)
		}else{
			return (
				<Provider store={this.store}>
					<div>
					{this.props.children}
					</div>
				</Provider>
			)
		}
	}
}

