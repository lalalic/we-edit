import {getSelection,getFile} from "../../state/selector"
import xQuery from "./xquery"

export default class Base{
	constructor(state,doc){
		this._state=state
		this._undoables={}
		this._selection=getSelection(state)
		this._file=getFile(state)
		this._content=state.get("_content")
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

	get content(){
		return this._content
	}

	cursorAt(id,at, endId=id, endAt=at, cursorAt){
		if(cursorAt=="start" || cursorAt=="end")
			this._selection.cursorAt=cursorAt

		this._selection={...this._selection,start:{id,at}, end:{id:endId, at:endAt}}
		return this._selection
	}

	cursorAtEnd(id){
		if(this.content.getIn([id,"type"])=="text"){
			return this.cursorAt(id, this.content.getIn([id,"children"]).length)
		}else{
			return this.cursorAt(id,1)
		}
	}


	insert({data,shiftKey}){

	}

	create({type}){

	}

	update({id,type,...changing}){

	}

	remove({backspace}){

	}

	copy(){

	}

	cut(){

	}

	paste(){

	}
}
