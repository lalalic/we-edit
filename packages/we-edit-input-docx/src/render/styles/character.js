import Base from "./base"

const attribs={
	"w:rFonts":"fonts",
	"w:sz":"size",
	"w:color":"color",
	"w:b":"bold",
	"w:i":"italic",
	"w:vanish":"vanish",
	"w:highlight":"highlight",
	"w:bdr":"border",
}
export default class Character extends Base{
	constructor(node, styles, selector){
		super(node, styles, selector)
		this.r=this._convert(node, "w:rPr",attribs, selector)
	}

	static Direct=class extends Character{
		constructor(node, styles, selector){
			super(node, styles, selector)
			this.r=this._convert(node, null,attribs, selector)
		}
	}

	flat(...inherits){
		let targets=[this,...inherits]
		return "fonts,size,color,highlight,border,underline,bold,italic,vanish,strike"
			.split(",")
			.reduce((props,k)=>{
				targets.find(a=>(props[k]=a.get(`r.${k}`))!==undefined)
				return props
			},{})
	}
}
