import React,{Component, Children} from "react"
import PropTypes from "prop-types"

import {createStore} from "state"

import {combineReducers} from "redux"
import {Provider} from "react-redux"
import {ACTION as EditorAction} from "state/action"

/**
<WeEdit>
	connect(({active,docs})=>({active,docs}))(({active,docs})=>{
		<div>tools</div>
		{Object.keys(docs).map(k=>docs[k]).map(({id,doc})=>(
			<div style={{display: active==id ? "block" : "none"}}>
				<doc.Store>
					{children}
				</doc.Store>
			</div>
		))}
	})
</WeEdit>
*/
export class WeEdit extends Component{
	static contextTypes={
		store: PropTypes.object
	}

	constructor(){
		super(...arguments)
		this.store=this.context.store||this.createStore()
	}

	createStore(){
		return createStore(combineReducers({[DOMAIN]:reducer}))
	}

	render(){
		return <Provider store={this.store} 
			children={<div style={{width:"100%"}}>{this.props.children}</div>}/>
	}
}


export const DOMAIN="we-edit"

const reducers={}

function getActiveDoc(state){
	return getActive(state).doc
}

export function getActive({"we-edit":{docs, active}}){
	return docs[active]||{}
}

export const ACTION={
	ADD:doc=>{
		let id=doc.id
		reducers[id]=doc.buildReducer()
		return {type:`${DOMAIN}/ADD`,payload:{id,state: reducers[id](), doc}}
	},
	SAVE:()=>(dispatch,getState)=>{
		return getActiveDoc(getState())
			.save()
			.then(()=>dispatch({type:`${DOMAIN}/SAVE`}))
	},
	SAVEAS: path=>(dispath, getState)=>{
		return getActiveDoc(getState())
			.save(path)
			.then(()=>dispatch({type:`${DOMAIN}/SAVE`}))
	},
	CLOSE: ()=>({type:`${DOMAIN}`/CLOSE}),
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
		case `${DOMAIN}/SAVE`:{
			let active=getActiveDoc(state)
			return {...state, docs:{...state.docs, [state.active]:{...active,changed:false}}}
		}
		case `${DOMAIN}/CLOSE`:{
			let active=getActiveDoc(state)
			if(active){
				delete state.docs[active]
				let docs=Object.keys(state.docs)
				if(docs.length>0)
					return {...state, docs:{...state.docs}, active:docs[0]}
			}
			return {...state, active:null, docs:null}
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
								state:changedMyState,
								changed:changedMyState.get("content")!=myState.get("content"),
								canUndo: myDoc.history.canUndo(),
								canRedo: myDoc.history.canRedo(),
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







