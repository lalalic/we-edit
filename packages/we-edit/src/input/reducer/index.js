import {getSelection,getFile} from "../../state/selector"
import ACTION from "../../state/action"
import xQuery from "./xquery"

class Base{
	constructor(state,doc){
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

	get position(){
		const {start,end}=this.selection
		if(start.id==end.id){
			const target=this.$('#'+start.id)
			if(start.at==end.at){
				if(target.attr('type')=="text"){
					const text=target.text()
					if(start.at==0){
						return "at_text_beginning"
					}else if(start.at==text.length){
						return "at_text_end"
					}else{
						return "in_text"
					}
				}
				if(start.at==0){
					return `at_${target.attr("type")}_beginning`
				}else if(start.at==1){
					return `at_${target.attr("type")}_end`
				}
				return "carot"
			}
		}else{
			return "range"
		}
	}

	save4undo(id){
		this._undoables[id]=this.file.cloneNode(this.file.getNode(id),false)
	}

	cursorAt(id,at, endId=id, endAt=at, cursorAt){
		if(cursorAt=="start" || cursorAt=="end")
			this._selection.cursorAt=cursorAt

		this._selection={...this._selection,start:{id,at}, end:{id:endId, at:endAt}}
		return this._selection
	}

	undo({action,changed,selection}){
		//recover changed to this.file
		//render changed
		//recover selection
	}

	redo({action,changed,selection}){

	}
}

class Action extends Base{
	insert_text_in_text(text){

	}

	insert_text_at_end(){

	}

	insert_text_at_beginning(){

	}

	insert_text_lines(lines){
		const first=lines.unshift(),last=lines.pop()
		this.splitAtUpto(this.selection.start,"paragraph")
		this[`insert_text_${this.position}`](first)
	}
}



class Reducer extends Base{
	splitAtUpto({id,at},to="paragraph"){
		const target=this.$('#'+id)
		const text=target.text()
		to=typeof(to)=="string" ? target.closest(to) : to
		const parent=to.parent()

		this.save4undo(to.attr('id'))
		this.save4undo(parent.attr('id'))

		let to1=target.constructUp(to)
			.insertAfter(to)

		let t0=to1.findFirst("text")
			.text(text.substr(at))

		target.parentsUntil(to).each(function(i,node,$){
			this.eq(i).after($(node).nextAll())
		},t0.parentsUntil(to1))

		target.text(text.substr(0,at))

		this.file.renderChanged(this.file.getNode(to.attr('id')))
		this.file.renderChanged(this.file.getNode(to1.attr('id')))
		this.file.renderChanged(this.file.getNode(parent.attr('id')))
		return [to,to1]
	}

	/*start at beginning of node, end at ending of node*/
	seperateSelection(){
		const {start,end}=this.selection
		if(!(start.id==end.id && start.at==end.at)){
			const element=id=>({id,type:this.$('#'+id).attr("type")})
			const [newEnd]=this.file.splitNode(element(end.id),end.at, start.id==end.id)
			end.id=newEnd.id
			end.at=newEnd.at

			const [,{id,at}]=this.file.splitNode(element(start.id),start.at)
			if(end.id==start.id){
				end.id=id
				end.at=end.at-(start.at-at)
			}
			start.id=id
			start.at=at
			this.cursorAt(start.id,start.at, end.id, end.at)
		}
	}

	insert_text_at(inserting,{id,at}){
		const target=this.$('#'+id)
		const text=target.text()
        if(inserting.indexOf("\r")==-1 && inserting.indexOf("\n")==-1){
    		target.text(text.substring(0,at)+inserting+text.substr(at))
    		this.cursorAt(id,at+inserting.length)
            return
        }else{
    		const p=target.closest("paragraph")
    		const pieces=inserting.split(/[\r\n]+/g)
    		const FIRST=0
    		const LAST=pieces.length-1
    		pieces.reduceRight((b,piece,i)=>{
    			switch(i){
    				case FIRST:{//first piece merged into
    					target.text(text.substring(0,at)+piece)
    					break
    				}
    				case LAST:{
    					let p0=target.constructUp(p)
    						.insertAfter(p)

    					let t0=p0.findFirst("text")
    						.text(piece+text.substr(at))

    					target.parentsUntil(p).each(function(i,node,$){
    						this.eq(i).after($(node).nextAll())
    					},t0.parentsUntil(p0))

    					this.cursorAt(t0.attr("id"), piece.length)
    					break
    				}
    				default:{
    					target.constructUp(p)
    						.insertAfter(p)
    						.findFirst("text")
    						.text(piece)
    					break
    				}
    			}
    		},1)
        }
	}

	merge_content_at(contents,{id,at}){
		const renderedContents=contents.map(a=>this.renderChanged(this.file.attach(a)))
		renderedContents.reverse().forEach((a,i)=>{
			const aNode=this.$(`#${a.id}`)
			const type=aNode.attr('type')
			const [part0]=this.splitAtUpto({id,at},type)
			part0.after(aNode)
		})
	}

	removeSelection(){
		const {start,end}=this.selection
		const endId=end.id
		if(start.id==end.id){
			if(start.at!=end.at){
				const target=this.$(`#${start.id}`)
				target.tailor(start.at,end.at)
				if(this.$(`#${start.id}`).length>0){
					this.cursorAt(start.id,start.at)
				}
			}
		}else{
			this.seperateSelection()
			const {start,end}=this.selection
			const target0=this.$('#'+start.id)
			const target1=this.$("#"+end.id)

			const ancestor=target0.parentsUntil(target1.parentsUntil()).last().parent()
			if(ancestor.length>0){
				const ancestors0=target0.parentsUntil(ancestor)
				const ancestors1=target1.parentsUntil(ancestor)
				const top0=ancestors0.last()
				const top1=ancestors1.last()

				top0.nextUntil(top1).remove()
				ancestors0.not(top0).each((i,a)=>this.$('#'+a.get("id")).nextAll().remove())
				ancestors1.not(top1).each((i,a)=>this.$('#'+a.get("id")).prevAll().remove())
			}

			target0.remove()
			target1.remove()

			this.cursorAt(endId,0)
		}
	}

	clone(keepId){
		const {start,end}=this.selection
		const endId=end.id
		if(start.id==end.id){
			const target=this.$(`#${start.id}`)
			if(start.at!=end.at){
				const cloned=target.clone()
				if(target.attr('type')=="text")
					return cloned.text(target.text().substring(start.at,end.at))
				else
					return cloned
			}else if(target.attr('type')!="text"){
				return target.clone()
			}else{
				return target.eq(1)//empty
			}
		}else{
			this.seperateSelection()
			const {start,end}=this.selection
			const target0=this.$('#'+start.id)
			const target1=this.$("#"+end.id)

			const ancestor=target0.parentsUntil(target1.parentsUntil()).last().parent()
			if(ancestor.length>0){
				const ancestors0=target0.parentsUntil(ancestor)
				const ancestors1=target1.parentsUntil(ancestor)
				const top0=ancestors0.last()
				const top1=ancestors1.last()

				const clonedSiblings=top0.nextUntil(top1).clone()
				const cloneOutter=node=>{
					return node.constructUp(node)
				}

				const clonedTop0=target0.add(ancestors0.not(top0)).toArray()
					.reduce((clonedA,a)=>{
					 	const target=this.$('#'+a)
						const parent=cloneOutter(target.parent())
						parent.append(clonedA)
						parent.append(target.nextAll().clone())
						return parent
					},target0.clone())

				const clonedTop1=target1.add(ancestors1.not(top1)).toArray()
					.reduce((clonedA,a)=>{
					 	const target=this.$('#'+a)
						const parent=cloneOutter(target.parent())
						parent.prepend(clonedA)
						parent.prepend(target.prevAll().clone())
						return parent
					},target1.clone())

				return clonedTop0.add(clonedSiblings).add(clonedTop1)
			}else{
				throw new Error("not support yet")
			}
		}
	}

}

class Content extends Reducer{
	create(element){
		this.removeSelection()
		var {start:{id,at}}=this.selection
		const target=this.$('#'+id)
		if(at>0){
			([,{id,at}]=this.file.splitNode({id},at))
		}
		const cursor=this.file.createNode(element,{id,at})
		this.cursorAt(cursor.id, cursor.at)
		return this
	}

	insert(data){
		this.removeSelection()

		if(typeof(data)=="string"){
			let {start:{id,at}}=this.selection
			const target=this.$('#'+id)
			if(target.attr('type')!="text"){
				const last=target.findLast(node=>node.children==undefined || typeof(node.children)=="string")
				if(last.attr('type')=="text"){
					this.cursorAt(last.attr('id'),last.text().length)
				}else{
					const cursor=this.file.createNode({type:"text",children:""},{id,at})
					this.cursorAt(cursor.id,cursor.at)
				}
			}

			this.insert_text_at(data,this.selection.start)
		}else{
			this.merge_content_at(data, this.selection.start)
		}
		return this
	}

	update({id,type,...changing}){
		if(!type){
			type=Object.keys(changing)[0]
			changing=changing[type]
		}

		this.seperateSelection()

		const targets=id ? [id] : (()=>{
			const {start,end}=this.selection
			const from=this.$(`#${start.id}`)
			const to=this.$(`#${end.id}`)
			const targets=((from,to)=>start.id==end.id ? from : from
				.add(from.forwardUntil(to))
				.add(to.parents())
				.add(to)
			)(from,to)

			return targets//self
				.add(from.parents())//ancestors
				.filter(type)
				.add(from.add(to).find(type))//descendents
				.toArray()
		})();

		targets.forEach(target=>{
			this.file.updateNode({id:target,type},changing)
		})

		return this
	}

	remove({backspace,responsible},i=0){
		if(i>1){
			console.error("there's inifinte loop during removing things")
			return
		}
		const {start,end}=this.selection
		if(start.id==end.id && start.at==end.at){
			if(backspace){
				const {id,at}=responsible.getComposer(start.id).prevCursorable(start.id, start.at)
				if(start.id==id && start.at==at)
					return this
				if(start.at>0){
					this.$(`#${start.id}`).tailor(start.at-1,start.at)
					this.cursorAt(id,at)
				}else{
					this.cursorAt(id,at)
					return this.remove({backspace:false,responsible},++i)
				}
			}else{
				const {id,at}=responsible.getComposer(start.id).nextCursorable(start.id, start.at)
				if(start.id==id && start.at==at)
					return this
				const target=this.$(`#${start.id}`)
				if(start.at==0 || target.attr("type")=="text"){
					target.tailor(start.at,start.at+1)
					if(start.id!==id){
						this.cursorAt(id,at)
					}
				}else if(start.at==1 && target.attr("type")=="paragraph"){
					const next=target.next()
					if(next.attr("type")=="paragraph"){
						target.append(next.children())
						next.remove()
						this.cursorAt(id,at)
					}
				}else{
					this.cursorAt(id,at)
					return this.remove({backspace:true,responsible},++i)
				}
			}
		}else{
			if(end.at==0){
				const {id,at}=responsible.getComposer(end.id).prevCursorable(end.id,end.at)
				this.cursorAt(start.id, start.at, id,at+1)
			}
			this.removeSelection(true)
			{
				const {start}=this.selection
				const {id,at}=responsible.getComposer(start.id).nextCursorable(start.id,start.at)
				if(start.id!=id && at==0){
					this.cursorAt(id,at)
				}
			}
		}

		return this
	}
}

var clipboard
class Clipboard extends Content{
	move(dest){
		const cloned=this.clone(true)
		this.insert(cloned, dest)
        return this
	}

	cut({clipboardData}={}){
		clipboard=this.clone(true)
		this.remove()
        return this
	}

	copy({clipboardData}={}){
		clipboard=this.clone()
        return this
	}

	paste({clipboardData}={}){
		const data=clipboard||clipboardData.getData("text")
		if(data){
			this.insert(data)
		}
		return  this
	}
}

export default class extends Clipboard{

}
