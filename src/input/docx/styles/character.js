import Base from "./base"

export default class extends Base{
	constructor(node, styles, selector){
		super(...arguments)
		this.rPr=this._convert("w:rPr",{
			"w:rFonts":"fonts",
			"w:sz":"size",
			"w:color":"color",
			"w:b":"bold",
			"w:i":"italic",
			"w:vanish":"vanish"
		}, selector)
	}
}