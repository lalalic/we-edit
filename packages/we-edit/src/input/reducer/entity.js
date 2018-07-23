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
		
		/*
		const [p0,p1]=this.splitAtUpto(this.selection.start,type)
		const createdNode=this.file.createNode(element, this, target)
		const {id:createdId}=this.renderChanged(createdNode)
		
		let created=this.$(`#${createdId}`).insertAfter(p0)
		
		this.renderChangedChildren(p0.parent().attr('id'))
		
		function locateTextCursor(){
			let id=created.findFirst('text').attr('id')
			
			if(!id){
				id=created.forwardUntil("text").attr('id')
			}
			
			if(!id){
				id=created.backwardUntil("text").attr('id')
			}
			
			if(!id)
				id=this.$('text').attr('id')
			return id
		}
		*/
		
		this.cursorAt(cursor.id, cursor.at)

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
			let scale=1+Math.max(Math.abs(x)/width,Math.abs(y)/height)*x/Math.abs(x)
			changing={width:width*scale, height:height*scale}
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
