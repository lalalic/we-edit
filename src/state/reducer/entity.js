import {text as reducer} from "./text"

export class entity extends reducer{
	create({type}){
		let {start:{id,at},end}=this.selection
		let path=["create"]
		if(id==end.id && at==end.at){

		}else{
			this.remove_withSelection()
		}

		let {nodes,prevId}=this.file.create(this.arguments[0])
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
	}

	resize({x,y}){
		let {start:{id}}=this.selection
		const {width,height}=this.$('#'+id).attr("size").toJS()
		let changedNode

		this.save4undo(id)

		if(y===undefined){
			changedNode=this.file.resize(id,width+x)
		}else if(x===undefined){
			changedNode=this.file.resize(id,null,height+y)
		}else{
			let ratio=1+Math.max(Math.abs(x)/width,Math.abs(y)/height)*x/Math.abs(x)
			changedNode=this.file.resize(id,width*ratio,height*ratio)
		}

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
