import {List} from "immutable"
import Changer from "./changer"

export default class text extends Changer{
	state(){
		return super.state()
	}

	save4undo(id){
		this._undoables[id]=this.file.cloneNode(this.file.getNode(id))
	}

	renderChanged(id){
		let node=this._renderChanged(this.file.getNode(id).get(0))
		if(this._state.hasIn(["content",id]))
			this._updated[node.id]={}
		return node
	}

	renderChangedChildren(id){
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
				if(text.length-1==at){
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

	remove_withoutSelection_backspace_headOf_text(){
		throw new Error("no implementation")
	}

	remove_withoutSelection_backspace_headOf_paragraph(){
		throw new Error("no implementation")
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
		throw new Error("no implementation")
	}

	remove_withoutSelection_delete_tailOf_text(removing){
		throw new Error("no implementation")
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
