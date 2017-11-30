import {WithStore} from "we-edit/component"

import Workspace from "./workspace"

var _uuid=0
const uuid=()=>`${_uuid++}`
const reducers={}

export const ACTION={
	ADD:doc=>{
		let id=uuid()
		reducers[id]=WithStore.buildStoreKeyReducer(id,doc.buildReducer())[id]
		return {type:"ADD",payload:{id,state: reducers[id](), doc}}
	},
	SAVE:()=>(dispatch,getState)=>{
		const state=getState()
		const doc=state.docs[state.active].doc
		return doc.save()
	},
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
		default:
			let id=Object.keys(reducers).filter(a=>type.startsWith(`${a}/`))[0]
			if(id){
				let reducer=reducers[id]
				let myState=state.docs[id].state
				myState=reducer(myState,action)
				return {...state, docs:{...state.docs, [id]:{...state.docs[id],state:myState}}}
			}
			return state
	}
}

Workspace.reducer={workspace:reducer}

export  default Workspace
