import Changer from "./changer"

export default class entity extends Changer{
	resize({x,y}){
		let {start:{id}}=this.selection
		const target=this.getNode(id)
		const {size:{width,height}}=this.getContent(id).props

		if(y===undefined){
			this.resize_width(target,width+x)
		}else if(x===undefined){
			this.resize_height(target,height+y)
		}else{
			let ratio=1+Math.max(Math.abs(x)/width,Math.abs(y)/height)*x/Math.abs(x)
			this.resize_width_height(target,width*ratio,height*ratio)
		}
		return this
	}

	resize_width(node,x){

	}

	resize_height(node,y){

	}

	resize_width_height(node,x,y){

	}

	rotate({x,y}){
		return this
	}

	move({id,at}){
		return this
	}
}
