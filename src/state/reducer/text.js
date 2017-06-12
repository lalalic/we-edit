import {List} from "immutable"
import diff from "immutablediff"

import Changer from "./changer"

export default class text extends Changer{
	state(){
		let changedContent=this._mutableState.get("content")
		let rawContent=this._state.get("content")
		let dif=diff(rawContent, changedContent)
		const before=id=>rawContent.get(id).toJS()
		const after=id=>changedContent.get(id).toJS()
		
		let changed=dif.reduce((state,d)=>{
			const {updated}=state
			let {op,path,value}=d.toJS()
			let [id,key,prop]=path.split("/").slice(1)
			switch(op){
				case "add":{
					break
				}
				case "replace":{
					this.save4Undo(this.file.getNode(id),id)
					
					if(key=="children" && typeof(value)!="string"){
						updated[id]={children:value}
					}else{
						updated[id]={}
					}
					
					let updatedNode=this.file.updateNode(
						before(id),
						{[key]: prop ? {[prop]:value} : value},
						after(id)
					)
					
					this.renderChanged(updatedNode)
					break
				}
				case "remove":{
					if(key==undefined){//remove node
						this.save4Undo(this.file.getNode(id),id)
						this.file.removeNode(before(id))
					}else if(key=="children"){
						if(!(id in updated) || !updated[id].children){
							updated[id]={children:changedContent.getIn([id,"children"]).toJS()}
							this.renderChanged(this.file.getNode(id).get(0))
						}
					}else{
						updated[id]={}
					}
					break
				}
			}
			return state
		},{
			updated:{}
		})
		
		
		
		if(Object.keys(changed.updated).length)
			return {...super.state(),...changed}
		else
			return super.state()
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

		let text=target.text()
		target.text(text.substring(0,at)+inserting+text.substr(at))

		this.cursorAt(id,at+inserting.length)
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

		let text=target.text()
		target.text(text.substring(0,at-removing)+text.substr(at))

		this.cursorAt(id,at-removing)
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

		let text=target.text()
		target.text(text.substring(0,at)+text.substr(at-removing))
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
		let text=target.text()
		target.text(text.substring(0,start.at)+text.substring(end.at))
		this.cursorAt(start.id,start.at)
	}
	
	remove_withSelection(){
		const {start,end}=this.selection
		const target0=this.$('#'+start.id)
		const target1=this.$("#"+end.id)
		const ancestor=target0.parentsUntil(target1.parentsUntil()).last().parent()

		let ancestors0=target0.parentsUntil(ancestor)
		let ancestors1=target1.parentsUntil(ancestor)
		let top0=ancestors0.last()
		let top1=ancestors1.last()

		let ancestorId=top0.parent().attr("id")
		console.assert(!!ancestorId)

		let removingTops=top0.nextUntil(top1)
		
		removingTops.remove()
		ancestors0.not(top0).each((i,a)=>$(a).nextAll().remove())
		ancestors1.not(top1).each((i,a)=>$(a).prevAll().remove())

		let text=target0.text()
		target0.text(text.substring(0,start.at))

		text=target1.text()
		target1.text(text.substr(end.at))
		
		this.cursorAt(start.id,start.at)
	}
}
