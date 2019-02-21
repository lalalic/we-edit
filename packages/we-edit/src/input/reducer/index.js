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

	save4undo(id){
		//this._undoables[id]=this.file.cloneNode(this.file.getNode(id),false)
	}

	cursorAt(id,at, endId=id, endAt=at, cursorAt){
		if(cursorAt=="start" || cursorAt=="end")
			this._selection.cursorAt=cursorAt

		this._selection={...this._selection,start:{id,at}, end:{id:endId, at:endAt}}
		return this._selection
	}
}

class Reducer extends Base{
	isEntityAction({id}={}){
		if(id!=undefined){
			return id
		}
		const {start,end}=this.selection
		if(start.id==end.id && start.at==end.at){
			return start.id
		}

		return false
	}

	clone(keepId=false){
		const element=id=>({id,type:this.$('#'+id).attr("type")})

		const cloned=[]
		const {start,end}=this.selection
		const target0=this.$("#"+start.id)

		const clonedTarget0=this.file.cloneNode(element(start.id),false,keepId)
		cloned.push(clonedTarget0)

		if(start.id==end.id){
			this.tailor({node:clonedTarget0,type:target0.attr("type")},start.at,end.at)
		}else{
			const target1=this.$("#"+end.id)

			const ancestor=target0.parentsUntil(target1.parentsUntil()).last().parent()
			const ancestors0=target0.parentsUntil(ancestor)
			const ancestors1=target1.parentsUntil(ancestor)

			ancestors0.last().nextUntil(ancestors1.last())
				.each((i,a)=>cloned.push(this.file.cloneNode(element(a.get("id")),false,keepId)))

			const clonedTarget1=this.file.cloneNode(element(end.id),false,keepId)
			this.tailor({node:clonedTarget1,type:target1.attr("type")},0, end.at)
			cloned.push(clonedTarget1)
		}

		return cloned
	}

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
	split4Operation(){
		const {start,end}=this.selection
		if(!(start.id==end.id && start.at==end.at)){
			const element=id=>({id,type:this.$('#'+id).attr("type")})
			this.file.splitNode(element(end.id),end.at)

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
    					this.renderChanged(p.attr("id"))
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
		if(start.id==end.id){
			if(start.at!=end.at){
				this.$(`#${start.id}`).tailor(start.at,end.at)
				this.cursorAt(start.id,start.at)
			}
		}else{
			this.split4Operation()
			const target0=this.$('#'+start.id)
			const target1=this.$("#"+end.id)

			const ancestor=target0.parentsUntil(target1.parentsUntil()).last().parent()

			const ancestors0=target0.parentsUntil(ancestor)
			const ancestors1=target1.parentsUntil(ancestor)
			const top0=ancestors0.last()
			const top1=ancestors1.last()

			const removeNode=id=>this.$('#'+id).remove()
			top0.nextUntil(top1).each((i,id)=>removeNode(id))
			ancestors0.not(top0).each((i,a)=>this.$('#'+a.get("id")).nextAll().each((i,id)=>removeNode(id)))
			ancestors1.not(top1).each((i,a)=>this.$('#'+a.get("id")).prevAll().each((i,id)=>removeNode(id)))

			target0.remove()
			target1.remove()
			this.cursorAt(start.id,start.at)
		}
	}
}

class Content extends Reducer{
	create(element){
		this.removeSelection()
		const {start:{id,at}}=this.selection
		const target=this.$(`#${id}`)

		const cursor=this.file.createNode(element, this, target)

		this.cursorAt(cursor.id, cursor.at)

		return this
	}

	insert(data){
		this.removeSelection()

		if(typeof(data)=="string"){
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

		this.split4Operation()

		const targets=id ? [id] : (()=>{
			const {start,end}=this.selection
			const from=this.$(`#${start.id}`)
			const targets=((from,to)=>start.id==end.id ? from : from
				.add(from.forwardUntil(to))
				.add(to.parents())
				.add(to)
			)(from,this.$(`#${end.id}`))

			return targets//self
				.add(from.parents())//ancestors
				.filter(type)
				.add(targets.find(type))//descendents
				.toArray()
		})();

		targets.forEach(target=>{
			this.file.updateNode({id:target,type},changing)
			const rerenderTarget=this.$('#'+target).closest("paragraph").attr("id")||target
			this.renderChanged(rerenderTarget)
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
			this.removeSelection()
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
		clipboard=this.clone()
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
