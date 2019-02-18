import {getSelection,getFile} from "../../state/selector"
import ACTION from "../../state/action"
import xQuery from "./xquery"

class Base{
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
		//this._undoables[id]=this.file.cloneNode(this.file.getNode(id),false)
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
			this.file.tailorNode({node:clonedTarget0,type:target0.attr("type")},start.at,end.at)
		}else{
			const target1=this.$("#"+end.id)

			const ancestor=target0.parentsUntil(target1.parentsUntil()).last().parent()
			const ancestors0=target0.parentsUntil(ancestor)
			const ancestors1=target1.parentsUntil(ancestor)

			ancestors0.last().nextUntil(ancestors1.last())
				.each((i,a)=>cloned.push(this.file.cloneNode(element(a.get("id")),false,keepId)))

			const clonedTarget1=this.file.cloneNode(element(end.id),false,keepId)
			this.file.tailorNode({node:clonedTarget1,type:target1.attr("type")},0, end.at)
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

		this.renderChanged(to.attr('id'))
		this.renderChanged(to1.attr('id'))
		this.renderChanged(parent.attr('id'))
		return [to,to1]
	}

	getTyped(type){
		const {start,end}=this.selection
		if(start.id==end.id && start.at==end.at){
			return this.$(`#${start.id}`).closest(type).toArray()
		}

		const element=id=>({id,type:this.$('#'+id).attr("type")})

		this.file.splitNode(element(end.id),end.at,this)

		;(()=>{
			const [,{id,at}]=this.file.splitNode(element(start.id),start.at,this)
			if(end.id==start.id){
				end.id=id
				end.at=end.at-(start.at-at)
			}
			start.id=id
			start.at=at
			this.cursorAt(start.id,start.at, end.id, end.at)
		})();

		var from=this.$(`#${start.id}`)
		var to=this.$(`#${end.id}`)
		var targets=from

		if(start.id!=end.id){
			targets=targets
				.forwardUntil(to)
				.add(to.parents())
				.add(from)
				.add(to)
		}

		return targets
			.add(from.parents())
			.filter(type)
			.toArray()
	}

	insert_text_at(inserting,{id,at}){
        const target=this.$('#'+id)
        const text=target.text()
        if(inserting.indexOf("\r")==-1 && inserting.indexOf("\n")==-1){
    		this.save4undo(id)
    		target.text(text.substring(0,at)+inserting+text.substr(at))
    		this.cursorAt(id,at+inserting.length)
            return
        }else{
    		const p=target.closest("paragraph")
    		const pieces=inserting.split(/[\r\n]+/g)
    		const FIRST=0
    		const LAST=pieces.length-1
    		this.save4undo(p.attr("id"))
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

}

class Content extends Reducer{
	create(element){
		if(this.isEntityAction()===false){
			this.remove()
		}

		const {start:{id,at}}=this.selection
		const target=this.$(`#${id}`)

		const cursor=this.file.createNode(element, this, target)

		this.cursorAt(cursor.id, cursor.at)

		return this
	}

	insert(data){
		if(this.isEntityAction()===false){
			this.remove()
		}

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
		const targets=id ? [id] : this.getTyped(type)

		targets.forEach(target=>{
			this.file.updateNode({id:target,type},changing)
			const rerenderTarget=this.$('#'+target).closest("paragraph").attr("id")||target
			this.renderChanged(rerenderTarget)
		})

		return this
	}

	remove({backspace,responsible},i=0){
		if(i>5){
			console.error("there's inifinte loop during removing things")
			return
		}
		const element=id=>({id,type:this.$('#'+id).attr("type")})
		const {start,end}=this.selection

		if(start.id==end.id){
			if(start.at!=end.at){
				this.file.tailorNode(element(start.id),start.at,end.at)
			}else{
				if(backspace){
					const {id,at}=responsible.getComposer(start.id).prevCursorable(start.id, start.at)
					if(start.at>0){
						this.file.tailorNode(element(start.id),start.at-1,start.at)
						this.renderChanged(id)
						this.cursorAt(id, at)
					}else if(this.$(`#${start.id}`).attr("type")=="text"){//remove prev.last
						this.file.tailorNode(element(start.id),-1)
						if(start.id!==id){
							this.renderChanged(this.$('#'+id).parent().attr("id"))
							this.cursorAt(id,at)
						}else{
							this.renderChanged(start.id)
						}
					}else{
						this.cursorAt(id,at)
						return this.remove({backspace:false,responsible},++i)
					}
				}else{
					const {id,at}=responsible.getComposer(start.id).nextCursorable(start.id, start.at)
					if(start.at==0){
						this.file.tailorNode(element(start.id),0,1)
						if(start.id!==id){
							this.renderChanged(this.$('#'+id).parent().attr("id"))
							this.cursorAt(id,at)
						}else{
							this.renderChanged(start.id)
						}
					}else if(this.$(`#${start.id}`).attr("type")=="text"){
						this.file.tailorNode(element(start.id),start.at,start.at+1)
						this.renderChanged(start.id)
					}else{
						this.cursorAt(id,at)
						return this.remove({backspace:true,responsible},++i)
					}
				}
			}
		}else{
			const removeNode=id=>this.file.removeNode(element(id))
			const target0=this.$('#'+start.id)
			const target1=this.$("#"+end.id)

			const ancestor=target0.parentsUntil(target1.parentsUntil()).last().parent()

			const ancestors0=target0.parentsUntil(ancestor)
			const ancestors1=target1.parentsUntil(ancestor)
			const top0=ancestors0.last()
			const top1=ancestors1.last()

			top0.nextUntil(top1).each((i,id)=>removeNode(id))
			ancestors0.not(top0).each((i,a)=>this.$('#'+a.get("id")).nextAll().each((i,id)=>removeNode(id)))
			ancestors1.not(top1).each((i,a)=>this.$('#'+a.get("id")).prevAll().each((i,id)=>removeNode(id)))

			this.file.tailorNode(element(end.id),0,end.at)
			this.file.tailorNode(element(start.id),start.at)
			this.renderChanged(top0.attr("id"))
	        this.renderChanged(top1.attr("id"))
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
