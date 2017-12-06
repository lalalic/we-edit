import document from "./document"

export class entity extends document{
	create(element){
		let {start:{id,at},end}=this.selection
		if(id==end.id && at==end.at){

		}else{
			this.remove_withSelection()
		}

		let created=this.file.createNode(element,this)
		let {nodes,prevId}=created
		let prev=prevId ? this.$('#'+prevId) : null

		nodes.reduceRight(node=>{
			let {id}=this.renderChanged(node)
			if(prev){
				preve.after('#'+id)
			}else{
				let parentId=this.file.getNode(id)
					.parentsUntil("[id]").parent().attr("id")
				let parent=this.$('#'+parentId)
				let siblings=parent.children()
				if(silbings.length){
					siblings.first().before('#'+id)
				}else{
					parent.append('#'+id)
				}
			}
		})

		if(!right){
			siblings=siblings.reverse()
		}

		parent.attr("children", siblings)

		this.renderChangedChildren(parent.attr('id'))

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

		changedNode=this.file.updateNode(content.get(0).toJS(), this)

		this.renderChanged(changedNode)

		return this
	}

	rotate({x,y}){
		return this
	}

	move({id,at}){
		return this
	}
}
