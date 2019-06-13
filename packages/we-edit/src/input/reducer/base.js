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
		this.fixSelection()
		return this._selection
	}

	cursorAtEnd(id){
		if(this.content.getIn([id,"type"])=="text"){
			return this.cursorAt(id, this.content.getIn([id,"children"]).length)
		}else{
			return this.cursorAt(id,1)
		}
	}

	fixSelection(){
		const fixSelection=this.fixSelection
		this.fixSelection=a=>a
			
		try{
			var {start, end}=this.selection
			if(start.id!=end.id && start.at!=end.at){
				//move end to end of prev if ending at beginning of something,  
				if(end.at==0){
					const prev=this.$(`#${end.id}`).backwardFirst()
					this.cursorAtEnd(prev.attr('id'))
					end=this.selection.end
				}

				this.cursorAtEnd(start.id)
				//move beginning to beginning of next if beginning at end of something, 
				if(start.at==this.selection.start.at){
					const next=this.$(`#${start.id}`).forwardFirst()
					start.id=next.attr('id')
					start.at=0
				}

				let temp=null
				//start can't include end
				while((temp=this.$(`#${start.id}`)).find(`#${end.id}`).length>0){
					this.cursorAt(temp.children().first().attr('id'),0,end.id, end.at)
					start=this.selection.start
				}
				
				//end can't include start
				while((temp=this.$(`#${end.id}`)).find(`#${start.id}`).length>0){
					this.cursorAtEnd(temp.children().last().attr('id'))
					end=this.selection.end
				}
				
				//start should be ahead of end
				if(start.id!=end.id && this.$('#${start.id}').forwardFirst(`#${end.id}`).length==0){
					temp=end
					end=start
					start=end
					this.selection.cursorAt=this.selection.cursorAt=="start" ? "end" : "start"
				}

				this.cursorAt(start.id, start.at, end.id,end.at)
			}
		}finally{
			this.fixSelection=fixSelection
		}
    }


	insert({data,shiftKey}){
		return this
	}

	create({type}){
		return this
	}

	update({id,type,...changing}){
		return this
	}

	remove({backspace}){
		return this
	}

	copy(){
		return this
	}

	cut(){
		return this
	}

	paste(){
		return this
	}
}
