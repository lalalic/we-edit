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
		this.cursorable=this.cursorable.bind(this)
	}

	state(){
		let state={}

		if(Object.keys(this._undoables).length>0)
			state.undoables=this._undoables

		if(Object.keys(this._selection).length>0)
			state.selection=this._selection

		return state
	}

	get clipboard(){
		return window._clipboard
	}

	set clipboard(v){
		return window._clipboard=v
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

    get $target(){
        return this.$(`#${this.selection.start.id}`)
    }

    get target(){
        return this.file.getNode(this.selection.start.id)
    }	

	cursorAt(id,at, endId=id, endAt=at, cursorAt,fix=true){
		if(cursorAt=="start" || cursorAt=="end")
			this._selection.cursorAt=cursorAt

		this._selection={...this._selection,start:{id,at}, end:{id:endId, at:endAt}}
		if(fix){
			this.fixSelection()
		}
		return this._selection
	}

	cursorAtEnd(id){
		if(this.content.getIn([id,"type"])=="text"){
			return this.cursorAt(id, this.content.getIn([id,"children"]).length)
		}else{
			return this.cursorAt(id,1)
		}
	}

	selectWhole(id){
		if(this.content.getIn([id,"type"])=="text"){
			return this.cursorAt(id, 0, id, this.content.getIn([id,"children"]).length)
		}else{
			return this.cursorAt(id,0,id, 1)
		}
	}

    cursorable(n){
        const type=n.get('type')
        const children=n.get('children')
        switch(type){
            case "text":
				return (children||"").length>0
			case "image":
				return true
            case "paragraph":
                return this.$(n).findFirst(this.cursorable).length==0 || undefined
            default:
                return !!!children || undefined
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
					const prev=this.$(`#${end.id}`).backwardFirst(this.cursorable)
					if(prev.length>0){
						this.cursorAtEnd(prev.attr('id'))
					}
					end=this.selection.end
				}

				this.cursorAtEnd(start.id)
				//move beginning to beginning of next if beginning at end of something, 
				if(start.at==this.selection.start.at){
					const next=this.$(`#${start.id}`).forwardFirst(this.cursorable)
					if(next.length>0){
						start.id=next.attr('id')
						start.at=0
					}
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
				if(start.id!=end.id && this.$(`#${start.id}`).forwardFirst(`#${end.id}`).length==0){
					;({start,end}={start:end,end:start});
					this.selection.cursorAt=this.selection.cursorAt=="start" ? "end" : "start"
				}

				this.cursorAt(start.id, start.at, end.id,end.at)
			}else if(start.id==end.id && start.at==end.at){
				if(this.$target.closest("paragraph").length==0){
					const p=this.$target.findFirst('paragraph')
					if(p.length==1){
						this.cursorAt(p.attr('id'),0)
					}
				}
			}
		}finally{
			this.fixSelection=fixSelection
		}
	}
	
	safeCursor(f){
		const $target=this.$target
		const $parents=$target.parents()
		const parents=$parents.toArray()
		const indexes=[$target.attr('id'), ...parents].reduce((indexes, id, i, arr)=>{
			if(i<arr.length-1){
				const siblings=this.content.getIn(arr[i+1],'children')
				indexes.push(siblings.indexOf(id))
			}
			return indexes
		},[])

		f && f();

		const i=parents.findIndex(id=>this.content.has(id))
		const index=indexes[i]
		const $parent=this.$(`#${parents[i]}`)
		const $children=$parent.children()
		if($children.length>index){
			this.cursorAt($children.eq(index).attr('id'),0)
		}else if($children.length>0){
			this.cursorAtEnd($children.last().attr('id'))
		}else{
			this.cursorAtEnd($parent.attr('id'))
		}
	}

	init(){
		const $p=this.$().findFirst('paragraph')
		if($p.length>0){
			this.cursorAt($p.attr('id'),0)
			this.forward()
			this.backward()
		}
	}

	type(char){
		
	}

	delete(event){
		
	}

	backspace(event){
		
	}

	enter(event){
		
	}

	tab(event){
		
	}

	create({type}){
		
	}

	update({id,type,...changing}){
		
	}

	remove(){
		
	}

	copy(){
		
	}

	cut(){
		
	}

	paste(){
		
	}

	backward(){
		
	}

	forward(){
		
	}

	move(){
		
	}

    extend(type){
        const typed=this.$target.closest(type)
        if(typed.length>0){
            this.selectWhole(typed.attr('id'))
        }
    }
}
