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

	cursorAt(id,at, endId=id, endAt=at, cursorAt){
		if(cursorAt=="start" || cursorAt=="end")
			this._selection.cursorAt=cursorAt

		this._selection={...this._selection,start:{id,at}, end:{id:endId, at:endAt}}
		return this._selection
	}

	save4undo(id){

	}

	undo({action,changed,selection}){
		//recover changed to this.file
		//render changed
		//recover selection
	}

	redo({action,changed,selection}){

	}
}


class Reducer extends Base{
	element(id){
		return {id,type:this.$('#'+id).attr('type')}
	}

	splitAtUpTo({id,at},to){
		const target=this.$('#'+id)
		to=typeof(to)=="string" ? target.closest(to) : to
		const parent=to.parent()

		const to1=target.constructUp(to).insertAfter(to)

		const target1=to1.findLast(a=>this.$('#'+a).children().length==0)

		if(target.attr('type')=="text"){
			const text=target.text()
			target1.text(text.substr(at))
			target.text(text.substr(0,at))
		}

		const ancestors=target.parentsUntil(to)
		const ancestors1=target1.parentsUntil(to1)
		console.assert(ancestors.length==ancestors1.length)
		ancestors.each(i=>{
			ancestors1.eq(i).after(ancestors.eq(i).nextAll())
		})


		return [to,to1]
	}

	/*start at beginning of node, end at ending of node
	seperated to </>(<|/></|>)</>
	*/
	seperateSelection(){
		const {start,end}=this.selection
		console.assert(start.id!=end.id||start.at!=end.at)

		const isAtStart=({id,at=0})=>at==0
		const isAtEnd=({id,at=0})=>{
			const target=this.$('#'+id)
			const type=target.attr('type')
			return (type=="text" && at>=target.text().length) || (type!="text" && at==1)
		}

		if(isAtStart(end)){//go to end of prev cursorable
			const newEnder=this.$('#'+end.id).prevCursorable()
			end.id=newEnder.attr('id')
			end.at=newEnder.attr('type')=="text" ? newEnder.text().length : 1
			this.cursorAt(start.id,start.at, end.id,end.at)
		}

		if(isAtEnd(start)){
			start.id=this.$('#'+start.id).nextCursorable().attr('id')
			start.at=0
			this.cursorAt(start.id,start.at,end.id,end.at)
		}


		if(start.id==end.id){//entity
			const starter=this.$('#'+start.id)
			if(starter.type=="text"){
				if(start.at==0 && end.at>=starter.text().length){
					return
				}
			}else if(start.at==0 && end.at==1){
				return
			}
		}

		if(!(start.id==end.id && start.at==end.at)){
			if(isAtEnd(end)){
				//do nothing
			}else{
				const [newEnd]=this.file.splitNode(this.element(end.id),end.at, start.id==end.id)
				end.id=newEnd.id
				end.at=newEnd.at
				this.cursorAt(start.id,start.at,end.id,end.at)
			}

			if(isAtStart(start)){
				//do nothing
			}else{
				const [,{id,at}]=this.file.splitNode(this.element(start.id),start.at)
				if(end.id==start.id){
					end.id=id
					end.at=end.at-(start.at-at)
				}
				start.id=id
				start.at=at
				this.cursorAt(start.id,start.at, end.id, end.at)
			}
		}
	}

	insert_text(inserting){
		const {start:{id,at}}=this.selection
		const target=this.$('#'+id)
		const text=target.text()
        if(inserting.indexOf("\r")==-1 && inserting.indexOf("\n")==-1){
    		target.text(text.substring(0,at)+inserting+text.substr(at))
    		this.cursorAt(id,at+inserting.length)
            return
        }else{
			const pieces=inserting.split(/[\r\n]+/g)
    		const [p,p1]=this.splitAtUpTo({id,at},"paragraph")
			target.text(text.substring(0,at)+pieces.shift())
			p1.findFirst("text").text(pieces.pop()+text.substr(at))
			pieces.reverse().forEach(piece=>{
				target.constructUp(p)
					.insertAfter(p)
					.findFirst("text")
					.text(piece)
			})
			this.cursorAt(p1.findFirst("text").attr("id"),0)
        }
	}

	merge(contents){
		const {start:{id,at}}=this.selection
		var target=this.$('#'+id)
		const renderedContents=contents.map(a=>this.file.attach(a))
		if(renderedContents.length==1){
			const single=this.$('#'+renderedContents[0])
			if(single.attr('type')=="paragraph"){
				renderedContents.splice(0,1,...single.children().toArray())
			}
		}
		const isInline=this.$(renderedContents).filter("paragraph,table,frame").length==0
		if(isInline){
			const inParagraphTopParentId=target.parentsUntil("paragraph").toArray().pop()
			if(inParagraphTopParentId){
				const topParent=this.$('#'+inParagraphTopParentId)
				this.splitAtUpTo({id,at},'#'+inParagraphTopParentId)
				renderedContents.reverse().forEach((a,i)=>{
					topParent.after(this.$(`#${a}`))
				})
			}else{
				if(at>0){
					const [,second]=this.file.splitNode(this.element(id),at)
					target=this.$('#'+second.id)
				}
				renderedContents.reverse().forEach((a,i)=>{
					target.before(this.$(`#${a}`))
				})
			}
		}else{
			const p=target.closest("paragraph")
			this.splitAtUpTo({id,at},"paragraph")
			const firstId=renderedContents.unshift()
			const lastId=renderedContents.pop()


			const last=this.$('#'+lastId)
			if(last.attr('type')=="paragraph"){
				p.next().prepend(last.children)
			}else{
				p.next().before(last)
			}

			renderedContents.reverse().forEach(a=>p.after(this.$('#')+a))

			const first=this.$('#'+firstId)
			if(first.attr('type')=="paragraph"){
				p.append(first.children())
			}else{
				p.after(first)
			}




		}

	}

	removeSelection(){
		const {start,end}=this.selection
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
			const cursorAfterRemove=target1.nextCursorable().add(target0.prevCursorable()).eq(0)

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

			this.cursorAt(cursorAfterRemove.attr('id'),0)//it's not correct if the original end at entity end
		}
	}

	clone(keepId){
		const {start,end}=this.selection
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
				debugger
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
			([,{id,at}]=this.file.splitNode(this.element(id),at))
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

			this.insert_text(data)
		}else{
			this.merge(data)
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

		targets.forEach(id=>{
			this.file.updateNode(this.element(id),changing)
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
