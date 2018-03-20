import React,{Component, Children} from "react"
import PropTypes from "prop-types"

import {createStore} from "state"

import {combineReducers} from "redux"
import {Provider} from "react-redux"
import {ACTION as EditorAction} from "state/action"

import Input from "input"

export class WeEdit extends Component{
	static propTypes={
		types: PropTypes.arrayOf(function(types, key, componentName){
			if(!types[key].isWeEditType){
				throw new Error(`Invalid prop types provided to ${componentName}: types[${key}] is not valid Input type implementation` )
			}
		})
	}
	
	static defaultProps={
		types:[]
	}
	
	static contextTypes={
		store: PropTypes.object
	}

	constructor(){
		super(...arguments)
		this.store=this.context.store||this.createStore()
		this.props.types.forEach(type=>Input.support(type))
	}

	createStore(){
		return createStore(combineReducers({[DOMAIN]:reducer}))
	}

	render(){
		return (
			<Provider store={this.store}>
				{this.props.children}
			</Provider>
		)
	}
}


export const DOMAIN="we-edit"

const reducers={}

export function getActive({[DOMAIN]:{docs, active}}){
	return docs[active]||{}
}

export const ACTION={
	ADD:doc=>{
		let id=doc.id
		reducers[id]=doc.buildReducer()
		return {type:`${DOMAIN}/ADD`,payload:{id,state: reducers[id](), doc}}
	},
	CLOSE: ()=>({type:`${DOMAIN}/CLOSE`}),
	ACTIVE: id=>({type:`${DOMAIN}/ACTIVE`, payload:id}),
	...EditorAction
}

export function reducer(state={active:null,docs:{}}, action){
	const {type,payload}=action
	switch(type){
		case `${DOMAIN}/ADD`:{
			return {
				...state,
				docs:{...state.docs,[payload.id]:payload},
				active:payload.id
			}
		}
		case `${DOMAIN}/ACTIVE`:
			return {...state, active:payload}
		case `${DOMAIN}/CLOSE`:{
			let active=state.docs[state.active]
			if(active){
				active.doc.release()
				delete state.docs[active.id]
				active=Object.keys(state.docs)[0]
			}
			return {...state, docs:{...state.docs}, active}
		}
		default:{
			let id=state.active
			if(id && type.startsWith(DOMAIN)){
				let reducer=reducers[id]
				let myDoc=state.docs[id].doc
				let myState=state.docs[id].state
				let changedMyState=reducer(myState,action)
				if(changedMyState){
					return {
						...state, 
						docs:{
							...state.docs, 
							[id]:{
								...state.docs[id],
								state:changedMyState
							}
						}
					}
				}else{
					let docs={...state.docs}
					delete docs[id]
					let active=Object.keys(docs)[0]
					return {...state, docs, active}
				}
			}
			return state
		}
	}
}







