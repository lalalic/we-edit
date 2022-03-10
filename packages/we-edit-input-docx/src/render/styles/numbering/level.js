import Paragraph from "../paragraph"

export default class Level extends Paragraph{
	constructor(node, styles, selector){
		super(...arguments)
		node.children.forEach(a=>{
			switch(a.name){
			case "w:pPr":
			case "w:rPr":
				
			break
			case "w:lvlPicBulletId":
				this.picture={...styles.picBullets[a.attribs['w:val']]}
			break
			case "w:lvlText":
				this.label=a.attribs['w:val']
			break
			default:
				let key=a.name.split(":").pop()
				this[key]=a.attribs["w:val"]
			}
		})

		if(this.picture)
			this.label=this.picture

		if(this.isLgl)
			this.numFmt="decimal"
		this.level=parseInt(node.attribs["w:ilvl"])
		this.start=parseInt(this.start)
	}
}