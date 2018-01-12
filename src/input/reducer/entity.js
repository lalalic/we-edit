import  Content from "./content"

export class entity extends Content{
	create(element){
		let {start:{id,at},end}=this.selection
		const target=this.$(`#${id}`)
		const p=target.closest("paragraph")
		const parent=p.parent()
		
		if(id==end.id && at==end.at){

		}else{
			this.remove_withSelection()
		}

		const [p0,p1]=this.splitAtUpto(this.selection.start,"paragraph")
		const createdNode=this.file.createNode(element, this.$('#'+id));
		const {id:createdId}=this.renderChanged(createdNode)
		let created=this.$(`#${createdId}`).insertAfter(p0)
		
		this.renderChangedChildren(parent.attr('id'))
		
		id=created.findFirst('text').attr('id')
		at=0
		this.cursorAt(id,at)
		
		return this
	}

	resize({x,y}){
		let {start:{id}}=this.selection
		let content=this.$('#'+id)
		const {width,height}=content.attr("size").toJS()
		let changedNode
		let changing={}

		this.save4undo(id)

		if(y===undefined){
			changing={width:width+x}
		}else if(x===undefined){
			changing={height:height+y}
		}else{
			let ratio=1+Math.max(Math.abs(x)/width,Math.abs(y)/height)*x/Math.abs(x)
			changing={width:width*ratio, height:height*ratio}
		}

		content.attr("size",changing)

		this.renderChanged(id)

		return this
	}

	rotate({x,y}){
		return this
	}

	move({id,at}){
		return this
	}
}
