import {WithStore} from "we-edit/component"

import Workspace from "./workspace"

var _uuid=0
const uuid=()=>`${_uuid++}`
const reducers={}

function getActiveDoc(state){
	return state.docs[state.active].doc
}

export const ACTION={
	ADD:doc=>{
		let id=uuid()
		reducers[id]=WithStore.buildStoreKeyReducer(id,doc.buildReducer())[id]
		return {type:"ADD",payload:{id,state: reducers[id](), doc}}
	},
	SAVE:()=>(dispatch,getState)=>{
		getActiveDoc(getState()).save()
	},
	SAVEAS: path=>(dispath, getState)=>getActiveDoc(getState()).save(path),
	CLOSE: ()=>({}),
	ACTIVE: id=>({type:"ACTIVE", payload:id})
}

export function reducer(state={
		active:null,
		docs:{}
	}, action){
	const {type,payload}=action
	switch(type){
		case "ADD":{
			return {
				...state,
				docs:{...state.docs,[payload.id]:payload},
				active:payload.id
			}
		}
		case "ACTIVE":
			return {...state, active:payload}
		default:
			let id=Object.keys(reducers).filter(a=>type.startsWith(`${a}/`))[0]
			if(id){
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

export  default Workspace
