import {List} from "immutable"
import Changer from "./changer"

export default class text extends Changer{
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
		}

		this[path.join("_")](...arguments)
		return this
	}


	insert_withoutSelection_string_withoutNewLine(inserting){

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
		throw new Error("no implementation")
	}

	remove_withoutSelection_backspace_headOf_text(){
		throw new Error("no implementation")
	}

	remove_withoutSelection_backspace_headOf_paragraph(){
		throw new Error("no implementation")
	}

	remove_withoutSelection_delete(removing){
		throw new Error("no implementation")
	}

	remove_withoutSelection_delete_tailOf_paragraph(removing){
		throw new Error("no implementation")
	}

	remove_withoutSelection_delete_tailOf_text(removing){
		throw new Error("no implementation")
	}

	remove_withSelection(){
		throw new Error("no implementation")
	}
}
