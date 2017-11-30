import Base from "./base"

export default class extends Base{
	constructor(node, styles, selector){
		super(...arguments)
		this.r=this._convert(node, "w:rPr",{
			"w:rFonts":"fonts",
			"w:sz":"size",
			"w:color":"color",
			"w:b":"bold",
			"w:i":"italic",
			"w:vanish":"vanish"
		}, selector)
	}
}
