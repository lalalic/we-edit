import document from "./document"

export class text extends document{
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

		this.save4undo(p.attr("id"))

		let text=target.text()

		pieces.reduceRight((b,piece,i)=>{
			switch(i){
				case FIRST:{//first piece merged into
					target.text(text.substring(0,at)+piece)
					this.renderChanged(p.attr("id"))
					break
				}
				case LAST:{
					let {id:idP0}=this.renderChanged(target.constructUp(p))

					let p0=this.$('#'+idP0).insertAfter(p)
					
					let t0=p0.findFirst("text").text(piece+text.substr(at))

					target.parentsUntil(p).each(function(i,node,$){
						this.eq(i).after($(node).nextAll())
					},t0.parentsUntil(p0))

					this.cursorAt(t0.attr("id"), piece.length)
					break
				}
				default:{
					let {id:idP0}=this.renderChanged(target.constructUp(p))
					this.$('#'+idP0)
						.insertAfter(p)
						.findFirst("text")
						.text(piece)
					break
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
}
