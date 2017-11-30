import Immutable from "immutable"

import {Workspace} from "./workspace"

var _uuid=0
const uuid=()=>`${_uuid++}`
const reducers={}

export const ACTION={
	ADD:doc=>{
		let id=uuid()
		let {state, reducer}=doc.initState(true)
		reducers[id]=reducer
		return {type:"ADD",payload:{id:uuid(), state, doc}}
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
}, {type,payload}){
	switch(type){
		case "ADD":
			return {
				...state, 
				docs:{...state.docs,[payload.id]:payload}, 
				active:payload.id
			}
		default:
			return state
	}
}

Workspace.reducer={
	workspace:reducer
}

export default Workspace