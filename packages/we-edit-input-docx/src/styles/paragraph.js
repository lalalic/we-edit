import Base from "./character"

export default class extends Base{
	constructor(node,styles,selector){
		super(...arguments)
		this.p=this._convert(node, "w:pPr",{
			"w:spacing":"spacing",
			"w:ind":"indent",
			"w:numPr":"num",
			"w:jc":"align",
			"w:outlineLvl":"heading"
		}, selector)
	}
}
