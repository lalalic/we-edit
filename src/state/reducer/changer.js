import {getSelection, getParentId,getFile,getContent} from "state/selector"
export default class Changer{
	constructor(state){
		this._state=state
		this._undoables={}
		this._updated={}
		this._selection=getSelection(state)
	}

	getParentId(id){
		return getParentId(this._state, id)
	}

	state(){
		let state={}
		if(Object.keys(this._updated).length>0)
			state.updated=this._updated
		
		if(_undoables.length>0)
			state.undoables=this._undoables
		
		if(Object.keys(this._selection).length>0)
			state.selection=this._selection

		if(Object.keys(state).length>0)
			return state
	}

	get selection(){
		return this._selection
	}

	get file(){
		return getFile(this._state)
	}

	getContent(id){
		return getContent(this._state,id).toJS()
	}
	
	updateChildren(parent,f){
		if(!(parent in this._updated)){
			this._updated[parent]={
				children:getContent(this._state,parent).get("children").toJS()
			}
		}
		f(this._updated[parent].children)
	}

	updateSelection(id,at, endId=id, endAt=at, cursorAt){
		if(cursorAt=="start" || cursorAt=="end")
			this._selection.cursorAt=cursorAt

		this._selection={...this._selection,start:{id,at}, end:{id:endId, at:endAt}}
		return this._selection
	}

	save4Undo(node){
		this._undoables[node.attr('id')]=this.clone(node)
	}

	renderChanged(changed){
		let id=this._renderChanged(changed).id
		if(this._state.hasIn(["content",id]))
			this._updated[id]={}
	}

	clone(node){
		throw new Error("you need implement it")
	}

	_renderChanged(changed){
		throw new Error("you need implement it")
	}
}
