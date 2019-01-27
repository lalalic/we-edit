import  Content from "./content"

export class entity extends Content{
	create(element){
		let {start:{id,at},end}=this.selection
		const target=this.$(`#${id}`)

		if(id==end.id && at==end.at){

		}else{
			this.remove_withSelection()
		}

		const cursor=this.file.createNode(element, this, target)

		this.cursorAt(cursor.id, cursor.at)

		return this
	}

	update({id, ...changing}){
		id=id||this.selection.start.id
		const target=this.$(`#${id}`)
		const type=target.attr("type")

		this.save4undo(id)
		this.file.updateNode({id,type},changing)

		this.renderChanged(id)

		return this
	}

	move({dest,id}){
		id=this.selection.start.id
		const target=this.$('#'+dest.id)
		const [to]=this.splitAtUpto(dest,target.parent())

		const content=this.$('#'+id)
		const paragraph=content.closest("paragraph")
		const removed=this.file.removeNode({id,type:content.attr("type")})
		const type=removed.attr("type")

		this.file.getNode(to.closest(type).attr("id")).after(removed)
		this.renderChanged(paragraph.attr("id"))
		this.renderChanged(to.closest("paragraph").attr("id"))
		return this
	}
}
