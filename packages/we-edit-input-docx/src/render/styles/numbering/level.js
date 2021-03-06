import Paragraph from "../paragraph"

export default class Level extends Paragraph{
	constructor(node, styles, selector){
		super(...arguments)
		node.children.forEach(a=>{
			switch(a.name){
			case "w:pPr":
			case "w:rPr":
				
			break
			default:
				let key=a.name.split(":").pop()
				this[key]=a.attribs["w:val"]
			}
		})
		this.level=parseInt(node.attribs["w:ilvl"])
		this.start=parseInt(this.start)
	}
}