import reducer from "./base"

export class entity extends reducer{
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
