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

	remove(removing){
		let docx=this.file
		let {start:{id,at},end}=this.selection
		let path=["remove"]
		if(id==end.id && at==end.at){
			path.push("withoutSelection")
			console.assert(typeof(removing)=="number")
			if(removing>0)
				path.push("backspace")
			else if(removing<0)
				path.push("delete")
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
		
	}
	
	remove_withoutSelection_delete(removing){
		
	}
	
	remove_withSelection(){
		
	}
}