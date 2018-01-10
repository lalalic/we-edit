import  Content from "./content"

export class entity extends Content{
	create(element){
		let {start:{id,at},end}=this.selection
		const target=this.$(`#{id}`)
		const p=target.parents("paragraph")
		const parent=p.parent()
		
		this.save4Undo(p.attr('id'))
		this.save4Undo(parent.attr('id'))
		
		if(id==end.id && at==end.at){

		}else{
			this.remove_withSelection()
		}

		const createdNode=this.file.createNode(element, this);
		const {id:createdId}=this.renderChanged(createdNode)
		let created=this.$(`#{createId}`)
		
		//table
		const [p0,p1]=this._splitParagraphAt(this.selection.start)
		this.file.insertNodeAfter(createdNode,p0)
		
		this.renderChanged(p0)
		this.renderChanged(p1)
		this.renderChangedChildren(parent.attr('id'))
		
		id=created.first('text').attr('id')
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
