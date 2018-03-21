import {getSelection, getRedos, getUndos} from "state/selector"

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
				state=state.set('redos',[])
				state=state.set('undos',[])
				return state
			}
			case "we-edit/history/UNDO":{
				let undos=getUndos(state)
				if(undos.length){
					let entry=undos.pop()
					let changedState=reducer(state,ACTION.undo(entry),{})
					let redos=getRedos(state)
					redos.push(entry)
					changedState=changedState.set('redos',[...redos])
					changedState=changedState.set('undos',[...undos])
					return changedState
				}else{
					return state
				}
			}
			case "we-edit/history/REDO":{
				let redos=getRedos(state)
				if(redos.length){
					let entry=redos.pop()
					let changedState=reducer(state.mergeDeepIn(["selection"],entry.selection),entry.action,{})
					let undos=getUndos(state)
					undos.push(entry)
					changedState=changedState.set('redos',[...redos])
					changedState=changedState.set('undos',[...undos])
					return changedState
				}else{
					return state
				}
			}
			default:{
				Object.freeze(action)
				let entry={
					action,
					selection:getSelection(state)
				}
				let changedState=reducer(state,action,entry)
				if(changedState.get("content")!==state.get("content")){
					let undos=getUndos(state)
					undos.push(entry)
					let redos=[]
					changedState=changedState.set('redos',[...redos])
					changedState=changedState.set('undos',[...undos])
				}
				return changedState
			}
		}

	}
}
