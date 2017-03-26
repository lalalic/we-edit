import Base from "./character"

export default class extends Base{
	constructor(node,styles,selector){
		super(...arguments)
		this.pPr=this._convert(node, "w:pPr",{
			"w:spacing":"spacing",
			"w:indent":"indent"
		}, selector)
	}
}
