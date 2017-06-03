import {getSelection} from "state/selector"

export const ACTION={
	undo:entry=>{
		let action={type:"history/UNDO"}
		if(entry){
			action.payload=entry
		}

		return action
	},
	redo:()=>({type:"history/REDO"})
}

class Entry{
	constructor(state,action){
		this.action=action
		this.selection=getSelection(state)
		this.changed=null
	}
}

export class History{
	past=[]
	future=[]

	/*it should be able to be merged*/
	add(entry){
		this.past.push(entry)
	}

	undoable(reducer){
		let history=this
		return function(state,action){
			switch(action.type){
				case "history/UNDO":{
					if(history.past.length){
						let entry=history.past.pop()
						let changedState=reducer(state,ACTION.undo(entry),{})
						history.future.push(entry)
						return changedState
					}else{
						return state
					}
				}
				case "history/REDO":{
					if(history.future.length){
						let entry=history.future.pop()
						let changedState=reducer(state,entry.action,{})
						history.past.push(entry)
						return changedState
					}else{
						return state
					}
				}
				default:{
					Object.freeze(action)
					let entry=new Entry(state,action)
					let changedState=reducer(state,action,entry)
					if(changedState.get("content")!==state.get("content"))
						history.add(entry)
					else
						history.future=[]
					return changedState
				}
			}

		}
	}
}
