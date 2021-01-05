import {getRedos, getUndos} from "./selector"

export const ACTION={
	undo:entry=>{
		let action={type:"we-edit/history/UNDO"}
		if(entry){
			action.payload=entry
		}

		return action
	},
	redo:()=>({type:"we-edit/history/REDO"}),
	clear:()=>({type:"we-edit/history/CLEAR"})
}

export default function undoable(reducer){
	return function(state,action){
		switch(action.type){
			case "we-edit/history/CLEAR":{
				return state
					.set('redos',[])
					.set('undos',[])
			}
			case "we-edit/history/UNDO":{
				const undos=getUndos(state)
				if(undos.length){
					const redos=getRedos(state)
					const entry=undos.pop()
					const {selection,content,action,patches}=entry
					const doc=state.get("doc")
					doc.rollback(patches)
					redos.push(entry)
					return state
						.set("content",content)
						.set("selection",selection)
						.set('redos',[...redos])
						.set('undos',[...undos])
				}else{
					return state
				}
			}
			case "we-edit/history/REDO":{
				const redos=getRedos(state)
				if(redos.length){
					const entry=redos.pop()
					const {selection,action}=entry
					const undos=getUndos(state)
					undos.push(entry)
					return reducer(state.set("selection",selection),action,{})
						.set('redos',[...redos])
						.set('undos',[...undos])
				}else{
					return state
				}
			}
			default:{
				Object.freeze(action)
				const entry={
					action,
					selection:state.get("selection"),
					content: state.get("content"),
					patches: null,//injected later in reducer, undo patch for doc file
					toJSON:()=>action.type
				}
				const changedState=reducer(state,action,entry)
				if(!changedState.get("content").equals(state.get("content"))){
					if(action.type==='we-edit/content/sync'){
						//@TODO: to merge change to each redos and undos' content
						return changedState
					}
					return changedState
						.set('redos',[])
						.set('undos',[...getUndos(state), entry])
				}
				return changedState
			}
		}

	}
}
