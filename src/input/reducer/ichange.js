import {List} from "immutable"
import Reducer from "./base"

export default class IChange extends Reducer{
    use(name){
        if(this[name])
            return this[name].bind(this)
        else
            return ()=>{
                console.warn(`${name} doesn't exists`)
                return this
            }
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

		this.use(path.join("_"))(...arguments)

		return this
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

        this.use(path.join("_"))(...arguments)
        return this
    }

    update(props){
        let type=Object.keys(props)[0]
		let set=props[type]
		const {start,end}=this.selection
        let targets=this.$(`#${start.id}`)
			.forwardUntil(`#${end.id}`)
			.add(this.$(`#${start.id}`).parents())
			.add(this$(`#${end.id}`).parents())
			.filter(type)

		let path=[]
		if(start.id==end.id){
			if(start.at==end.at){
				path.push("withoutSelection")
				if(start.at==0){
					path.push("atHead")
				}else if(start.at==this.$('#'+start.id).children.length-1){
					path.push("atTail")
				}
			}else{
				path.push("inline")
			}
		}else{
			path.push("withSelection")
			let p0=this.$('#'+start.id).parents("paragraph").attr('id')
			let p1=this.$('#'+end.id).parents("paragraph").attr('id')
			if(p0==p1){
				path.push("inParagraph")
			}else{
				path.puah("crossParagraph")
			}
		}

        let fname=null
        let typed=["update",type,...path].join("_")
        if(this[typed])
            fname=typed
        else
            fname=["update",...path].join("_")

		this.use(fname)(targets, set)

		return this
	}


	isFirstOfParagraph(id){
		return this.$('#'+id).closest("paragraph")
			.findFirst(n=>{
				if(!(n.get("children") instanceof List)){
					if(n.get("type")=="text"){
						if(n.get("children").length>0){
							return true
						}
					}else{
						return true
					}
				}
				return false
			})
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
			.findLast(n=>{
				if(!(n.get("children") instanceof List)){
					if(n.get("type")=="text"){
						if(n.get("children").length>0){
							return true
						}
					}else{
						return true
					}
				}
				return false
			})
			.attr("id")==id
	}
}
