import { instanceOf, node } from "prop-types"
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
		this.type="character"
		this.r=this._convert(node, "w:rPr",attribs, selector)
	}

	static Direct=class __$1 extends Character{
		constructor(node, styles, selector){
			super(node, styles, selector)
			this.r=this._convert(node, null,attribs, selector)
		}

		_convert(node, ...args){
			const r=super._convert(node, ...args)
			/**
			 * <cs/> or <rtl/> make cs fonts
			 */
			if(node.children.find(a=>a.name.endsWith(':cs')||a.name.endsWith(':rtl'))){
				(r.fonts=r.fonts||{}).hint='cs'
			}
			return r
		}

		getLink(){
			return this.styles[this.basedOn]?.getLink()
		}

		flat(...args){
			const props=super.flat(...args)
			if(this.r.fonts?.hint=="cs"){
				props.fonts=props.fonts.cs
			}else if(this.r.fonts?.hint=="eastAsia"){
				props.fonts=props.fonts.ea
			}
			return props
		}
	}

	flat(...inherits){
		const targets=[this,...inherits].filter(a=>a?.isStyle)
		const {"fonts.ascii":ascii,"fonts.ea":ea,"fonts.cs":cs,"fonts.hansi":hansi,...props}=
			"fonts.ascii,fonts.ea,fonts.cs,fonts.hansi,size,color,highlight,border,underline,bold,italic,vanish,strike,vertAlign"
			.split(",")
			.reduce((props,k)=>{
				targets.find(a=>(props[k]=a.get(`r.${k}`))!==undefined)
				return props
			},{})
		props.fonts=this.__clear({ascii,ea,cs,hansi},undefined)
		return this.__clear(props,undefined)
	}
}
