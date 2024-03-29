import {getSelection,getFile} from "../../state/selector"
import xQuery from "./xquery"

/**
 * 1. start/end in selection does make sense, since base Reducer is responsible for it
 * 2. Selection is normalized to following basic rules at beginning and end of reducing
 * 		* meaningful start and end
	 	* start and end can NOT include each other
	 	* cursor should be on paragraph or inner level
	 
 */
export default class Reducer{
	constructor(state){
		this._state=state
		this._undoables={}
		this._selection=getSelection(state)
		this._file=getFile(state)
		this._content=state.get("_content")
		this.$=context=>new xQuery(state,context)
		this.cursorable=this.cursorable.bind(this)

		let debug, self=this
		Object.defineProperties(this,{
			debug:{
				get(){
					return typeof(debug)==="boolean" ? debug : self._file.debug
				},
				set(v){
					debug=v
				}
			},
			clipboard:{
				configurable:true,
				get:()=>globalThis._clipboard,
				set:v=>globalThis._clipboard=v
			},
			$target:{
				configurable:true,
				get(){
					return this.$(`#${this.selection[this.selection.cursorAt||"end"].id}`)
				}
			},
			target:{
				configurable:true,
				get(){
					return this.file.getNode(this.selection[this.selection.cursorAt||"end"].id)
				}
			},
			cursor:{
				configurable:true,
				get(){
					const {cursorAt="end", ...a}=this.selection
					return a[cursorAt]
				}
			}
		})

		/**
		 * make start/end meaningful in content order to make situation simpler
		 * but selection order must be recovered when output state in .state()
		 * during reducing, the order should not be changed
		 */
		const {start,end,...others}=this.selection
		if(end.id){
			if((start.id==end.id && start.at>end.at) ||
				(start.id!=end.id && this.$(`#${start.id}`).forwardFirst(`#${end.id}`).length==0)){
				this._selection=Object.defineProperties({start:end, end:start,...others}, {
					cursorAt:{//read
						enumerable:true,
						writable:false,
						value:"start",
					}
				})
			}

			this.normalizeSelection()
		}
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

	get isCursor(){
		const {start,end}=this.selection
		return start.id==end.id && start.at==end.at
	}

	state(){
		let state={}

		if(Object.keys(this._undoables).length>0)
			state.undoables={...this._undoables}

		if(Object.keys(this._selection).length>0){
			this.normalizeSelection()
			const {start,end, cursorAt, ...others}=this._selection
			state.selection=cursorAt==="start" ? {start:end, end:start,...others} : {start,end,...others}
		}

		return state
	}

	cursorAt(id,at, endId=id, endAt=at,page){
		Object.assign(this._selection,{start:{id,at}, end:{id:endId, at:endAt}})
		if(page!=undefined){
			this._selection.page=page
		}
		return this._selection
	}

	cursorAtEnd(id){
		if(this.content.getIn([id,"type"])=="text"){
			return this.cursorAt(id, this.content.getIn([id,"children"])?.length||0)
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
	
	/**
	 * meaningful start and end
	 * start and end can NOT include each other
	 * cursor should be on paragraph or inner level
	 */
	normalizeSelection(){
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

			this.cursorAt(start.id, start.at, end.id,end.at)
		}else if(this.isCursor){
			this.normalizeCursorSelection()
		}
		if(this.$target.is("anchor")){
			const id=this.$target.children().eq(0).attr('id')
			if(this.selection.start.id==this.selection.end.id){
				this.selection.start.id=id
				this.selection.end.id=id
			}
		}
	}

	normalizeCursorSelection(){
		if(this.$target.attr('type')=="page")
			return 
		if(this.$target.closest("paragraph").length==0){
			const p=this.$target.findFirst('paragraph')
			if(p.length==1){
				this.cursorAt(p.attr('id'),0)
			}
		}
	}
	
	/**
	 * to make cursor safer???
	 * @param {*} f 
	 */
	safeCursor(f){
		const $target=this.$target
		const $parents=$target.parents()
		const parents=$parents.toArray()
		const indexes=[$target.attr('id'), ...parents].reduce((indexes, id, i, arr)=>{
			if(i<arr.length-1){
				const siblings=this.content.getIn([arr[i+1],'children'])
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
		const cursor=this.$().findFirst('page,paragraph')
		if(cursor.length>0){
			this.cursorAt(cursor.attr('id'),0)
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
	
	//merge remote to local
	merge(){

	}

	//push local to remote
	push(){

	}

	//resolve collaborative editing selection conflict
	conflict(){

	}

	search(){

	}

	replace(){

	}

	control(e){

	}
}
