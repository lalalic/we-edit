import IChange from "./ichange"

export  class Remove extends IChange{
	splitAtUpto({id,at},to="paragraph"){
		const target=this.$('#'+id)
		const text=target.text()
		to=typeof(to)=="string" ? target.closest(to) : to
		const parent=to.parent()

		this.save4undo(to.attr('id'))
		this.save4undo(parent.attr('id'))

		let to1=target.constructUp(to)
			.insertAfter(to)

		let t0=to1.findFirst("text")
			.text(text.substr(at))

		target.parentsUntil(to).each(function(i,node,$){
			this.eq(i).after($(node).nextAll())
		},t0.parentsUntil(to1))

		target.text(text.substr(0,at))

		this.renderChanged(to1.attr('id'))
		this.renderChanged(to.attr('id'))

		return [to,to1]
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

	remove_withoutSelection_backspace_headOf_text(removing){
		let {start:{id,at}}=this.selection
		let prev=this.$('#'+id)
			.backwardFirst(n=>{
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
	}

	remove_withoutSelection_delete_tailOf_text(removing){
		let {start:{id,at}}=this.selection
		let prev=this.$('#'+id)
			.forwardFirst(n=>{
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

		this.save4undo(start.id)

		let text=target.text()
		target.text(text.substring(0,start.at)+text.substring(end.at))
		this.cursorAt(start.id,start.at)

		this.renderChanged(start.id)
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

		//this.renderChanged(id)
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
					let p0=target.constructUp(p)
						.insertAfter(p)

					let t0=p0.findFirst("text")
						.text(piece+text.substr(at))

					target.parentsUntil(p).each(function(i,node,$){
						this.eq(i).after($(node).nextAll())
					},t0.parentsUntil(p0))

					this.cursorAt(t0.attr("id"), piece.length)
					break
				}
				default:{
					target.constructUp(p)
						.insertAfter(p)
						.findFirst("text")
						.text(piece)
					break
				}
			}
		},1)
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
		const {start:{id,at}, end, cursorAt}=this.selection
		let target=this.$(`#${id}`)
		let text=target.text()

		let grand=target.parentsUntil("paragraph")
				.add(target,"unshift")
				.last()
		let clonedRoute=target.constructUp(grand)

		let p=target.closest("paragraph")

		this.save4undo(p.attr('id'))

		clonedRoute.clone()
			.text(text.substring(0,at))
			.insertBefore(grand)

		target.text(text.substring(at, end.at))

		clonedRoute
			.text(text.substring(end.at))
			.insertAfter(grand)

		target.attr(changing)

		this.cursorAt(id,0,id,end.at-at)

		this.renderChanged(p.attr('id'))
	}

	update_text_withoutSelection_inline(targets, changing){
		const {start:{id,at}}=this.selection
		let target=this.$(`#${id}`)
		target.attr(changing)
		this.renderChanged(target.closest("paragraph").attr('id'))
	}

	update_text_withoutSelection_atHead(targets, changing){
		let {start:{id,at}}=this.selection
		let target=this.$('#'+id)
		let p=target.closest("paragraph")

		this.save4undo(p.attr('id'))

		let grand=target.parentsUntil("paragraph")
				.add(target,"unshift")
				.last()
		let created=target.constructUp(grand)
				.insertBefore(grand)
				.findFirst("text", true)
				.text("")

		Object.keys(changing).forEach(k=>created.attr(k, changing[k]))


		this.renderChanged(p.attr('id'))

		this.cursorAt(created.attr('id'),0)
	}

	update_withoutSelection_inline(targets, changing){
		let target=targets.first()
		target.attr(changing)
		this.renderChanged(target.attr("id"))
	}


	update_withoutSelection_atTail(){
		this.update_withoutSelection_inline(...arguments)
	}

	update_withoutSelection_atHead(){
		this.update_withoutSelection_inline(...arguments)
	}

	update_withSelection_inParagraph(){

	}

	update_withSelection_crossParagraph(){

	}
}


export default class extends Update{
	
}
