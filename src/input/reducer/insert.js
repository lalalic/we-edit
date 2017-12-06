import Remove from "./remove"

export class Insert extends Remove{
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
}


