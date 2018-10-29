export default class {
	constructor(node, styles, selector){
		this.styles=styles
		const pr=node.children.find(a=>a.name.endsWith(":spPr")
		
		if(pr){
			this.props=selector.select(pr.children,{
				xfrm: "transform",
				custGeom:"path",
				prstGeom:"shape",
				ln:"outline",
				solidFill:"fill",
				blipFill:"image"
			})
		}else{
			this.props={}
		}
	}
}