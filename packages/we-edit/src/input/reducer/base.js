import {getSelection,getFile} from "../../state/selector"
import ACTION from "../../state/action"
import xQuery from "./xquery"

export default class Base{
	constructor(state){
		this._state=state
		this._undoables={}
		this._selection=getSelection(state)
		this._file=getFile(state)

		this.$=context=>new xQuery(state,context)
	}

	state(){
		let state={}

		if(Object.keys(this._undoables).length>0)
			state.undoables=this._undoables

		if(Object.keys(this._selection).length>0)
			state.selection=this._selection

		return state
	}

	get selection(){
		return this._selection
	}

	get file(){
		return this._file
	}

	save4undo(id){
		this._undoables[id]=this.file.cloneNode(this.file.getNode(id),false)
	}

	renderChanged(id){
		let docNode=typeof(id)=="string" ? this.file.getNode(id) : id

		try{
			docNode=docNode.get(0)
		}catch(e){

		}

		let rendered=this.file.renderChanged(docNode)

		id=rendered.id

		if(this._state.hasIn(["content",id])){
			this._state.setIn(["_content",id,"parent"],
				this._state.getIn(["content",id,"parent"]))
		}

		return rendered
	}

	cursorAt(id,at, endId=id, endAt=at, cursorAt){
		if(cursorAt=="start" || cursorAt=="end")
			this._selection.cursorAt=cursorAt

		this._selection={...this._selection,start:{id,at}, end:{id:endId, at:endAt}}
		return this._selection
	}
}


class Content extends Base{
	create(){

	}

	insert(){

	}

	update(){

	}

	remove(){

	}
}

class Action extends Content{
	move(){

	}

	rotate(){

	}

	resize(){

	}
}

class Clipboard extends Action{
	cut(){
		this.clipboard=this.remove()
	}

	copy(){
		this.clipboard=this.selection
	}

	paste(){
		
	}
}

class Reducer extends Clipboard{

}
