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

		let nodes=this.file.createNode(props,id)
		let right=nodes[0].attr("id"), last=nodes[nodes.length-1].attr("id")
		let parent=this.$('#'+(right||last)).parent()
		let siblings=parent.children().toArray()
		let nodesRendered=null

		if(!right){
			right=last
			nodesRendered=nodes.map(a=>this.renderChanged(a.get(0))).reverse()
			siblings=siblings.reverse()
		}else{
			nodesRendered=nodes.map(a=>this.renderChanged(a))
		}

		right=siblings.indexOf(right)
		let inserted=0
		nodesRendered.forEach(({id},i)=>{
			if(!siblings.includes(id)){
				siblings.splice(right+i+inserted,0,id)
			}
		})

		if(!right){
			siblings=siblings.reverse()
		}

		parent.attr("children", siblings)

		this.renderChangedChildren(parent.attr('id'))

		return this
	}

	onTableCreate(props){
		let {start:{id}}=this.selection
		let $=this.$(`#${id}`)
		let section=$.closest("section")
		let width=section.attr("pgSz.width")
		let {left, right}=section.attr("pgMar").toJS()
		return {...props, width:width-left-right}
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
