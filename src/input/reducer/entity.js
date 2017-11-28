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
		let Type=type[0].toUpperCase()+type.substr(1)
		if(this[`on${Type}Create`]){
			props=this[`on${Type}Create`](props)
		}

		let created=this.file.createNode(props,id)
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
	}

	onTableCreate(props){
		let {start:{id}}=this.selection
		let $=this.$(`#${id}`)
		let width=$.closest("section")
				.attr("pgSz.width")
		return {...props, width}
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
