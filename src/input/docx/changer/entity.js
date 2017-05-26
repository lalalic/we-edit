import Base from "state/reducer/entity"

function px2cm(px){
	return Math.ceil(px*72/96*360000/28.3464567)
}

export class entity extends Base{
	resize_width(node,x){
		let cx=px2cm(x)
		let ext0=node.find("a\\:xfrm>a\\:ext")
		let cx0=parseInt(ext0.attr("cx"))
		ext0.attr("cx",cx)

		let inline=node.closest("wp\\:inline")
		if(inline.length){
			let ext1=inline.children("wp\\:extent")
			let cx1=parseInt(ext1.attr("cx"))
			ext1.attr("cx",cx+cx1-cx0)
		}
		//console.log("resized")
		this.renderChanged(inline.get(0))
	}

	resize_height(node,y){

	}

	resize_width_height(node,x,y){

	}
}
