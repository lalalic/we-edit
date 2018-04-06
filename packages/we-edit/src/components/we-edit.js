import React,{Component, Children} from "react"
import PropTypes from "prop-types"

import {combineReducers} from "redux"
import {Provider} from "react-redux"

import {ACTION as EditorAction} from "../state/action"
import {createStore} from "../state"
import Input from "../input"

/**
# example
```jsx
<WeEdit>

</WeEdit>
```
*/
export class WeEdit extends Component{
	static contextTypes={
		store: PropTypes.object
	}

	constructor(){
		super(...arguments)
		this.store=this.context.store||this.createStore(this.props.reducers)
	}

	createStore(customizedReducers={}){
		return createStore(combineReducers({[DOMAIN]:reducer, ...customizedReducers}))
	}

	render(){
		return (
			<Provider store={this.store}>
				{this.props.children}
			</Provider>
		)
	}
}

export default WeEdit

export const DOMAIN="we-edit"

const reducers={}

export function getActive({[DOMAIN]:{docs, active}}){
	return docs[active]
}

export const ACTION={
	ADD:(doc,reducer)=>{
		let id=doc.id
		reducers[id]=doc.buildReducer(reducer)
		return {type:`${DOMAIN}/ADD`,payload:{id,state: reducers[id](), doc}}
	},
	CLOSE: ()=>({type:`${DOMAIN}/CLOSE`}),
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
		case `${DOMAIN}/CLOSE`:{
			let active=state.docs[state.active]
			if(active){
				active.doc.release()
				delete state.docs[active.id]
				active=Object.keys(state.docs)[0]
			}
			return {...state, docs:{...state.docs}, active}
		}
		case `${DOMAIN}/MESSAGE`:
			return {...state, message:payload}
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
