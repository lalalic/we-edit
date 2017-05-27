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
			this.renderChanged(inline.get(0))
		}else{
			this.renderChanged(node.get(0))
		}
		
	}

	resize_height(node,y){
		let cy=px2cm(y)
		let ext0=node.find("a\\:xfrm>a\\:ext")
		let cy0=parseInt(ext0.attr("cy"))
		ext0.attr("cy",cy)

		let inline=node.closest("wp\\:inline")
		if(inline.length){
			let ext1=inline.children("wp\\:extent")
			let cy1=parseInt(ext1.attr("cy"))
			ext1.attr("cy",cy+cy1-cy0)
			this.renderChanged(inline.get(0))
		}else{
			this.renderChanged(node.get(0))
		}
		
	}

	resize_width_height(node,x,y){
		let cx=px2cm(x),cy=px2cm(y)
		let ext0=node.find("a\\:xfrm>a\\:ext")
		let cx0=parseInt(ext0.attr("cx")),cy0=parseInt(ext0.attr("cy"))
		ext0.attr("cx",cx).attr("cy",cy)

		let inline=node.closest("wp\\:inline")
		if(inline.length){
			let ext1=inline.children("wp\\:extent")
			let cx1=parseInt(ext1.attr("cx")),cy1=parseInt(ext1.attr("cy"))
			ext1.attr("cx",cx+cx1-cx0).attr("cy",cy+cy1-cy0)
			this.renderChanged(inline.get(0))
		}else{
			this.renderChanged(node.get(0))
		}
		
	}
}
