import Helper from "./helper"

export default class extends Helper{
	create(element){
		this.removeSelection()
		var {start:{id,at}}=this.selection
		const target=this.$('#'+id)
		if(!this.isAtEnd({id,at}) && !this.isAtStart({id,at})){
			([,{id,at}]=this.file.splitNode(this.element(id),at))
		}
		const cursor=this.file.createNode(element,{id,at})
		this.cursorAt(cursor.id, cursor.at)
		return this
	}

	insert({data,shiftKey}){
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

			this.insert_text(data,shiftKey)
		}else{
			this.merge(data,shiftKey)
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

	remove({backspace},i=0){
		if(i>1){
			console.error("there's inifinte loop during removing things")
			return
		}
		const {start,end}=this.selection
		if(start.id==end.id && start.at==end.at){
			if(backspace){
				if(start.at==0&&this.$(`#${start.id}`).closestStart("paragraph").is("paragraph")){
					this.backspaceParagraph()
					return this
				}

				const {id,at}=this.$(`#${start.id}`).prevCursorable(start.at)
				if(start.id==id && start.at==at)
					return this
				if(start.at>0){
					this.$(`#${start.id}`).tailor(start.at-1,start.at)
					this.cursorAt(id,at)
				}else{
					this.cursorAt(id,at)
					return this.remove({backspace:false},++i)
				}
			}else{
				const {id,at}=this.$(`#${start.id}`).nextCursorable(start.at)
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
					return this.remove({backspace:true},++i)
				}
			}
		}else{
			if(end.at==0){
				const {id,at}=this.$(`#${end.id}`).prevCursorable(end.at)
				this.cursorAt(start.id, start.at, id,at+1)
			}
			this.removeSelection(true)
			{
				const {start}=this.selection
				const {id,at}=this.$(`#${start.id}`).nextCursorable(start.at)
				if(start.id!=id && at==0){
					this.cursorAt(id,at)
				}
			}
		}

		return this
	}
}
