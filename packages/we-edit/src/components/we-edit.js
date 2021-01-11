import React,{PureComponent} from "react"
import PropTypes from "prop-types"

import {combineReducers} from "redux"
import {Provider} from "react-redux"

import memoize from "memoize-one"

import {ACTION as EditorAction} from "../state/action"
import {createStore} from "../state"
import {getFile} from "../state/selector"
import shallowEqual from "../tools/shallow-equal"

/**
# example
```jsx
<WeEdit>

</WeEdit>
```
*/
export class WeEdit extends PureComponent{
	static contextTypes={
		store: PropTypes.object
	}

	static propTypes={
		reducers: PropTypes.object
	}

	constructor(){
		super(...arguments)
		this.store=this.getStore(this.context.store, this.props.reducers)
	}

	getStore=memoize((store, reducers)=>{
		if(store){
			if(store.combineReducers){
				return store.combineReducers(reducers)
			}else{
				return store
			}
		}else{
			return createStore(combineReducers({[DOMAIN]:reducer, ...reducers}))
		}
	},(a,b)=>a===b || shallowEqual(a,b))

	render(){
		return (
			<Provider store={this.store}>
				{this.props.children}
			</Provider>
		)
	}

	componentDidUpdate(){
		this.store=this.getStore(this.context.store,this.props.reducers||{})
	}
}

export default WeEdit

export const DOMAIN="we-edit"

const reducers={}

export function getActive({[DOMAIN]:{docs, active}}){
	return docs[active]
}

export function getAll({[DOMAIN]:{docs}}){
	return Object.keys(docs).map(k=>docs[k])
}

export function getReducer(state){
	return reducers[state.active||getFile(state).id]
}

export const ACTION={
	ADD:(doc,reducer)=>{
		let id=doc.id
		reducers[id]=doc.buildReducer(reducer)
		return {type:`${DOMAIN}/ADD`,payload:{id,state: reducers[id](), doc}}
	},
	CLOSE: id=>({type:`${DOMAIN}/CLOSE`,payload:id}),
	ACTIVE: id=>({type:`${DOMAIN}/ACTIVE`, payload:id}),
	MESSAGE: payload=>({type:`${DOMAIN}/MESSAGE`,payload}),
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
		case `${DOMAIN}/MESSAGE`:
			return {...state, message:payload}
		case `${DOMAIN}/CLOSE`:{
			if(payload &&  state.active!=payload && reducers[payload]){
				reducers[payload](state.docs[payload],action)
				delete state.docs[payload]
				delete reducers[payload]
				return {...state, docs:{...state.docs}}
			}
		}
		default:{
			const id=state.active
			if(!(id && type.startsWith(DOMAIN)))
				return state
			
			const changedMyState=reducers[id](state.docs[id].state,action)
			if(action.type==`${DOMAIN}/CLOSE` || !changedMyState){
				delete state.docs[id]
				delete reducers[id]
				return {...state, docs:{...state.docs}, active:Object.keys(state.docs)[0]}
			}

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
		}
	}
}
