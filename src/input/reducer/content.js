import IChange from "./ichange"

export  class Remove extends IChange{
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

export class Insert extends Remove{
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

export class Update extends Insert{
	update_text_inline(targets, changing){
		const {start:{id,at}, end}=this.selection
		let target=this.$(`#${id}`)
		let text=target.text()
		let parent=target.parent()
		let grandPa=parent.parent()

		this.save4undo(parent.attr('id'))

		target.clone()
			.text(text.substring(0,at))
			.insertBefore(target)

		target.clone()
			.text(text.substring(end.at))
			.insertAfter(target)

		target.text(text.substring(at, end.at))

		target.attr(changing)

		this.renderChanged(graphPa)
	}

	update_withoutSelection(props){

	}

	update_withoutSelection_atHead(props){
		let {start:{id,at}}=this.selection
		let target=this.$('#'+id)
		let parent=target.parent()

		this.save4undo(parent.attr('id'))

		let created=target.clone()
		created.text("")
		Object.keys(props).forEach(k=>created.attr(k, props[k]))
		target.before(created)

		this.renderChanged(parent.attr('id'))
		this.cursorAt(created.attr('id'),0)
	}

	update_withoutSelection_atTail(props){

	}

	update_withSelection_inParagraph(){

	}

	update_withSelection_crossParagraph(){

	}
}


export default class extends Update{

}
