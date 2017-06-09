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
	
	isFirstOfParagraph(target){
		target=this.$(target)
		return target.closest("paragraph")
			.first(target.attr("type"))
			.attr("id")==target.attr("id")
	}
	
	isFirstOfDocument(){
		return false
	}
	
	isLastOfParagraph(id){
		return false
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
					if(this.isFirstOfParagraph(id)){
						if(this.isFirstOfDocument(id)){
							path.push("document")
						}else{
							path.push("paragraph")
						}
					}else{
						path.push("text")
					}
				}
			}else if(removing<0){
				path.push("delete")
				let {children:text}=this.getContent(id)
				if(text.length-1==at){
					path.push("tailOf")
					if(this.isLastOfParagraph(id)){
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
	
	remove_withoutSelection_backspace_headOf_document(){
		//do nothing
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