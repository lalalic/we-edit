import Base from "./base"

export default class extends Base{
	constructor(node, styles, selector){
		super(...arguments)
		this.basedOn=null
		this.cache=null
		
		this.rPr=this._convert("w:rDefaultPr",{
			"w:rFonts":"fonts",
			"w:sz":"size",
			"w:color":"color",
			"w:b":"bold",
			"w:i":"italic",
			"w:vanish":"vanish"
		}, selector)
		this.pPr=this._convert("w:pDefaultPr",{
			"w:spacing":"spacing",
			"w:indent":"indent"
		}, selector)
	}
}