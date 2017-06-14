import {List} from "immutable"
import Changer from "./changer"

export default class text extends Changer{
	state(){
		return super.state()
	}

	/**
	 * not need to record for undo
	 **/
	undo({changed:updated,selection}){
		let orphans={}
		const recoverId=node=>{
			return node.find("[_id]")
				.each((i,el)=>this.file.makeId(el,el.attribs._id))
				.removeAttr("_id")
		}

		const pre=(i,keys)=>{
			let found
			while(i>0){
				if((found=this.file.getNode(keys[--i])).length>0)
					return found
			}
			return null
		}

		const next=(i,keys)=>{
			let found,len=keys.length
			while(i<len){
				if((found=this.file.getNode(keys[++i])).length>0)
					return found
			}
			return null
		}
        Object.keys(updated)
			.reduce((sorted,a)=>{
				sorted[updated[a].cheerio ? "unshift" : "push"](a)
				return sorted
			},[])
		.forEach(k=>{
            let changing=updated[k]
            if(changing.cheerio){//a content node
                let last=updated[k].clone()
                let current=this.file.getNode(k)
				if(current.length==0){
					orphans[k]=last
				}else{
					recoverId(last)
					current.replaceWith(last)
					this.file.makeId(last.get(0),k)
					this.renderChanged(k)
				}
            }else if(changing.children){
				this._updated[k]={children:changing.children}
				this._state.updateIn(["_content",k,"children"],c=>new List(changing.children))

				changing.children.forEach((a,i)=>{
					let target=orphans[a]
					if(target){
						let n
						target.attr("id",a)
						if(n=pre(i,changing.children)){
							target.insertAfter(n)
						}else if(n=next(i,changing.children)){
							target.insertBefore(n)
						}

						let attached=this.file.getNode(a)
						recoverId(attached)
						attached.removeAttr("id")
						this.file.makeId(attached.get(0),a)
						this.renderChanged(a)
						this._state.setIn(["_content",a,"parent"],k)
					}
				})
            }
        })
        this._selection={...this._selection,...selection}
        return this
	}

	save4undo(id){
		this._undoables[id]=this.file.cloneNode(this.file.getNode(id))
	}

	renderChanged(id){
		let docNode=typeof(id)=="string" ? this.file.getNode(id).get(0) : id
		let rendered=this._renderChanged(docNode)
		
		id=rendered.id
		
		if(this._state.hasIn(["content",id])){
			this._state.setIn(["_content",id,"parent"],
				this._state.getIn(["content",id,"parent"]))
			this._updated[id]={}
		}
		
		return rendered
	}

	renderChangedChildren(id){
		if(id in this._undoables || id in this._updated)
			console.warning("some conflict in undo/update queue")

		this._undoables[id]={children:this._state.getIn(["content",id,"children"]).toJS()}
		this._updated[id]={children:this.$('#'+id).children().toArray()}
	}

	insert(inserting){
		let docx=this.file
		let {start:{id,at},end}=this.selection
		let path=["insert"]
		if(id==end.id && at==end.at){
			path.push("withoutSelection")
			if(typeof(inserting)=="string"){
				path.push("string")
				if(inserting.indexOf("\n")==-1 && inserting.indexOf("\r")==-1)
					path.push("withoutNewLine")
				else
					path.push("withNewLine")
			}else{

			}
		}else{
			path.push("withSelection")
			if(typeof(inserting)=="string"){
				path.push("string")
				if(inserting.indexOf("\n")==-1 && inserting.indexOf("\r")==-1)
					path.push("withoutNewLine")
				else
					path.push("withNewLine")
			}else{

			}
		}

		this[path.join("_")](...arguments)

		return this
	}

	isFirstOfParagraph(id){
		return this.$('#'+id).closest("paragraph")
			.findFirst(n=>!(n.get("children") instanceof List))
			.attr("id")==id
	}

	isFirstOfDocument(id){
		if(this.isFirstOfParagraph(id)){
			return this.$('#'+id).closest("paragraph").prev().length==0
		}
		return false
	}

	isLastOfDocument(id){
		if(this.isLastOfParagraph(id)){
			return this.$('#'+id).closest("paragraph").next().length==0
		}
		return false
	}

	isLastOfParagraph(id){
		return this.$('#'+id).closest("paragraph")
			.findLast(n=>!(n.get("children") instanceof List))
			.attr("id")==id
	}

	remove(removing){
		let docx=this.file
		let {start:{id,at},end}=this.selection
		let path=["remove"]
		if(id==end.id && at==end.at){
			path.push("withoutSelection")
			console.assert(Math.abs(removing)==1)
			if(removing>0){
				path.push("backspace")
				if(at==0){
					path.push("headOf")
					if(this.isFirstOfDocument(id)){
						//do nothing
						return this
					}else if(this.isFirstOfParagraph(id)){
						if(this.$('#'+id).closest("paragraph")
							.prev("paragraph").length==0){
							return this
						}

						path.push("paragraph")
					}else{
						path.push("text")
					}
				}
			}else if(removing<0){
				path.push("delete")
				let {children:text}=this.getContent(id)
				if(text.length==at){
					path.push("tailOf")
					if(this.isLastOfDocument(id)){
						return this
					}else if(this.isLastOfParagraph(id)){
						if(this.$('#'+id).closest("paragraph")
							.next("paragraph").length==0){
							return this
						}
						path.push("paragraph")
					}else{
						path.push("text")
					}
				}
			}
		}else{
			path.push("withSelection")
			if(id==end.id){
				path.push("inline")
			}
		}

		this[path.join("_")](...arguments)
		return this
	}

	insert_withoutSelection_string_withoutNewLine(inserting){
		let {start:{id,at}}=this.selection
		const target=this.$('#'+id)

		this.save4undo(id)

		let text=target.text()
		target.text(text.substring(0,at)+inserting+text.substr(at))

		this.cursorAt(id,at+inserting.length)

		this.renderChanged(id)
	}

	insert_withoutSelection_string_withNewLine(inserting){
		const {start:{id,at}}=this.selection
		const target=this.$('#'+id)
		const p=target.closest("paragraph")

		const pieces=inserting.split(/[\r\n]+/g)
		const FIRST=0
		const LAST=pieces.length-1
		
		this.save4Undo(p.attr("id"))
		
		let text=target.text()

		pieces.reduceRight((b,piece,i)=>{
			switch(i){
				case FIRST:{//first piece merged into 
					target.text(text.substring(0,at)+piece)
					this.renderChanged(p.attr("id"))
					break
				}
				case LAST:{
					let {id:idP0}=this.renderChanged(this.file.construct(target.attr("id"), p.attr("id")))
					
					let p0=this.$('#'+idP0).insertAfter(p)
					let t0=p0.findFirst("text").text(piece+text.substr(at))
					p0.append(r.nextAll())
					
					this.cursorAt(t0.attr("id"), piece.length)
					break
				}
				default:{
					let {id:idP0}=this.renderChanged(this.file.construct(target.attr("id"), p.attr("id")))
					let p0=this.$('#'+idP0).insertAfter(p)
					let t0=p0.findFirst("text").text(piece)
				}
			}
		},1)
		this.renderChangedChildren(p.attr("parent"))
	}

	insert_withSelection_string_withoutNewLine(inserting){
		this.remove_withSelection()
		this.insert_withoutSelection_string_withoutNewLine(...arguments)
	}

	insert_withSelection_string_withNewLine(inserting){
		this.remove_withSelection()
		this.insert_withoutSelection_string_withNewLine(...arguments)
	}

	remove_withoutSelection_backspace(removing){
		let {start:{id,at}}=this.selection
		let target=this.$('#'+id)

		this.save4undo(id)

		let text=target.text()
		target.text(text.substring(0,at-removing)+text.substr(at))

		this.cursorAt(id,at-removing)

		this.renderChanged(id)
	}

	remove_withoutSelection_backspace_headOf_text(removing){
		let {start:{id,at}}=this.selection
		let prev=this.$('#'+id)
			.prevFirst(n=>{
				return n.get("type")=="text"
					&& n.has("children")
					&& typeof(n.get("children"))=="string"
					&& !!n.get("children").length
			});
		id=prev.attr("id")
		at=prev.attr("children").length
		this.cursorAt(id,at)
		this.remove_withoutSelection_backspace(removing)
	}

	remove_withoutSelection_backspace_headOf_paragraph(){
		let {start:{id,at}}=this.selection
		let p=this.$('#'+id).closest("paragraph")
		let prev=p.prev("paragraph")

		this.save4undo(p.attr("id"))
		this.save4undo(prev.attr("id"))

		prev.append(p.children())
		p.remove()

		this.cursorAt(id,at)

		this.renderChanged(prev.attr("id"))
		this.renderChangedChildren(prev.attr("parent"))
	}

	remove_withoutSelection_delete(removing){
		let {start:{id,at}}=this.selection
		const target=this.$('#'+id)

		this.save4undo(id)

		let text=target.text()
		target.text(text.substring(0,at)+text.substr(at-removing))

		this.renderChanged(id)
	}

	remove_withoutSelection_delete_tailOf_paragraph(removing){
		let {start:{id,at}}=this.selection
		let p=this.$('#'+id).closest("paragraph")
		let nextP=p.next("paragraph")

		this.save4undo(p.attr("id"))
		this.save4undo(nextP.attr("id"))

		p.append(nextP.children())
		nextP.remove(false)

		this.cursorAt(id,at)

		this.renderChanged(p.attr("id"))
		this.renderChangedChildren(p.attr("parent"))
	}

	remove_withoutSelection_delete_tailOf_text(removing){
		let {start:{id,at}}=this.selection
		let prev=this.$('#'+id)
			.nextFirst(n=>{
				return n.get("type")=="text"
					&& n.has("children")
					&& typeof(n.get("children"))=="string"
					&& n.get("children").length>0
			});
		this.cursorAt(prev.attr("id"),0)
		this.remove_withoutSelection_delete(removing)
	}

	remove_withSelection_inline(){
		let {start,end}=this.selection
		let target=this.$('#'+start.id)

		this.save4undo(id)

		let text=target.text()
		target.text(text.substring(0,start.at)+text.substring(end.at))
		this.cursorAt(start.id,start.at)

		this.renderChanged(id)
	}

	remove_withSelection(){
		const {start,end}=this.selection
		const target0=this.$('#'+start.id)
		const target1=this.$("#"+end.id)
		const ancestor=target0.parentsUntil(target1.parentsUntil()).last().parent()
		const isInParagraph=ancestor.is("paragraph") || ancestor.parents("paragraph").length

		let ancestors0=target0.parentsUntil(ancestor)
		let ancestors1=target1.parentsUntil(ancestor)
		let top0=ancestors0.last()
		let top1=ancestors1.last()

		let removingTops=top0.nextUntil(top1)

		if(isInParagraph){
			this.save4undo(ancestor.attr("id"))
		}else{
			removingTops.each((i,node)=>this.save4undo(node.attr("id")))
			this.save4undo(top0.attr("id"))
			this.save4undo(top1.attr("id"))
		}

		removingTops.remove()
		ancestors0.not(top0).each((i,a)=>$(a).nextAll().remove())
		ancestors1.not(top1).each((i,a)=>$(a).prevAll().remove())

		let text=target0.text()
		target0.text(text.substring(0,start.at))

		text=target1.text()
		target1.text(text.substr(end.at))

		this.cursorAt(start.id,start.at)

		if(isInParagraph){
			this.renderChanged(ancestor.attr("id"))
		}else{
			this.renderChangedChildren(ancestor.attr("id"))
			this.renderChanged(top0.attr("id"))
			this.renderChanged(top1.attr("id"))
		}
	}
}
