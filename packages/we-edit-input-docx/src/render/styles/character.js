import Base from "./base"

const attribs={
	"w:rFonts":"fonts",
	"w:sz":"size",
	"w:color":"color",
	"w:b":"bold",
	"w:i":"italic",
	"w:u":"underline",
	"w:vanish":"vanish",
	"w:highlight":"highlight",
	"w:bdr":"border",
	"w:strike":"strike",
	"w:vertAlign":"vertAlign"
}
export default class Character extends Base{
	constructor(node, styles, selector){
		super(node, styles, selector)
		this.r=this._convert(node, "w:rPr",attribs, selector)
	}

	static Direct=class __$1 extends Character{
		constructor(node, styles, selector){
			super(node, styles, selector)
			this.r=this._convert(node, null,attribs, selector)
		}
	}

	flat(...inherits){
		let targets=[this,...inherits]
		const props="fonts,size,color,highlight,border,underline,bold,italic,vanish,strike,vertAlign"
			.split(",")
			.reduce((props,k)=>{
				targets.find(a=>(props[k]=a.get(`r.${k}`))!==undefined)
				return props
			},{})
		return this.__clear(props,undefined)
	}
}
