import {text as reducer} from "./text"

export class entity extends reducer{
	create({type}){
		let {start:{id,at},end}=this.selection
		let path=["create"]
		if(id==end.id && at==end.at){

		}else{
			this.remove_withSelection()
		}
		let props=arguments[0]
		if(this[`on${type}Create`])
			props=this[`on${type}Create`](props)

		let {nodes,prevId}=this.file.create(props)
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

	onTableCreate({id}){
		let width=this.$(`#${id}`)
			.closest("section")
			.attr("pgSz.width")
		return {...arguments[0], width}
	}

	resize({x,y}){
		let {start:{id}}=this.selection
		let content=this.$('#'+id)
		let props=content.props()
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

		changedNode=this.file.updateNode(props.toJS(), {size: changing}, this.$)

		this.renderChanged(changedNode.get(0))

		return this
	}

	rotate({x,y}){
		return this
	}

	move({id,at}){
		return this
	}
}
