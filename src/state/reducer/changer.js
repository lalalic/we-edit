import {getSelection, getParentId,getFile,getContent} from "state/selector"
export default class Changer{
	constructor(state){
		this._state=state
		this._updated={}
		this._removed=[]
		this._selection={}
	}
	
	getParentId(id){
		return getParentId(this._state, id)
	}
	
	state(){
		let state={}
		if(Object.keys(this._updated).length>0)
			state.updated=this._updated
		if(Object.keys(this._selection).length>0)
			state.selection=this._selection
		if(this._removed.length>0)
			state.removed=this._removed
		
		if(Object.keys(state).length>0)
			return state
	}
	
	get selection(){
		return getSelection(this._state)
	}
	
	get file(){
		return getFile(this._state)
	}
	
	updateChildren(id, f){
		if(!this._updated[id])
			this._updated[id]=getContent(this._state,id).get("children").toJS()
		f(this._updated[id])
		return this
	}
	
	removeContent(id){
		this._removed.push(id)
		return this
	}
	
	updateSelection(id,at, endId=id, endAt=at, cursorAt){
		if(cursorAt=="start" || cursorAt=="end")
			this._selection.cursorAt=cursorAt
		
		this._selection={...this._selection,start:{id,at}, end:{id:endId, at:endAt}}
		return this._selection
	}
}