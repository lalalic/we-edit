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

		this.file.updateNode({id,type},changing)

		this.renderChanged(id)

		return this
	}

	resize({x,y}){
		let {start:{id}}=this.selection
		let content=this.$('#'+id)
		const {width,height}=content.attr("size").toJS()

		let changing={}

		this.save4undo(id)

		if(y===undefined){
			changing={width:width+x}
		}else if(x===undefined){
			changing={height:height+y}
		}else{
			let scale=1+Math.max(Math.abs(x)/width,Math.abs(y)/height)*x/Math.abs(x)
			changing={width:width*scale, height:height*scale}
		}

		content.attr("size",changing)

		this.renderChanged(id)

		return this
	}

	rotate({x,y}){
		let {start:{id}}=this.selection
		let content=this.$('#'+id)
		const {width,height}=content.attr("size").toJS()

		this.save4undo(id)

		const degree=(Math.asin(x/height)+Math.asin(y/width))*180/Math.PI

		content.attr("rotate",(content.attr("rotate")||0)+degree)

		this.renderChanged(id)
		return this
	}

	move(dest){
		const {start:{id}}=this.selection
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
