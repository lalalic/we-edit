import Base from "./base"
import {fromJS} from "immutable"
import {clean} from "we-edit"
import {Measure} from "we-edit-representation-pagination"

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
	"w:lang": "lang",
	"w:vertAlign":"vertAlign"
}

export default class Character extends Base{
	constructor(node, styles, selector){
		super(node, styles, selector)
		this.type="character"
		this.r=this._convert(node, "w:rPr",attribs, selector)
	}

	hashCode(){
		return fromJS(this.flat()||{}).hashCode()
	}

	_convert(){
		const r=super._convert(...arguments)
		if(r?.vertAlign=="baseline"){
			delete r.vertAlign
		}
		return r
	}

	static Direct=class __$1 extends Character{
		constructor(node, styles, selector){
			super(node, styles, selector)
			this.r=this._convert(node, null,attribs, selector)
			if(!this.basedOn){
				this.basedOn=`*${this.type}`
			}
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
			if(this.r.fonts?.hint && props.fonts[this.r.fonts.hint]){
				switch(this.r.fonts.hint){
					case 'cs':
						props.fonts={fallback:this.r.fonts.cs}
						break
					case 'ea':{
						const extended=[EastAsiaHint]
						if(this.lang?.startsWith("zh-"))
							extended.push(EastAsiaHintAndZhLang)
						props.fonts={
							...props.fonts, 
							$(A,fonts,FontManager){
								if(extended.find(check=>check(A))!=-1)
									return 'ea'
								if(EastAsiaHintAndChinese50GB2312(A) && 
									(FontManager.get(fonts.ea)?.characterSet?.length===7446)){
									return 'ea'
								}
							}
						}
					}
				}
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
		props.fonts=clean({ascii,ea,cs,hansi},{emptyAsUndefined:true})
		return clean(props)
	}
}

const EastAsiaHint=Measure.FontMeasure.unicodeSegmentCheckFactory(
	`A1, A4, A7 – A8, AA, 
	AD, AF, B0 – B4, B6 – BA, 
	BC – BF, D7, F7,
	02B0 – 02FF,
	0300 – 036F,
	0370 – 03CF,	
	0400 – 04FF,
	1E00 - 1EFF,
	2000 - 27BF,
	2E80 – 2EFF,
	FB00 - FB1C`
)
const EastAsiaHintAndZhLang=Measure.FontMeasure.unicodeSegmentCheckFactory(`E0 – E1, E8 – EA, EC – ED, F2 – F3, F9 – FA, FC`)
const EastAsiaHintAndChinese50GB2312=Measure.FontMeasure.unicodeSegmentCheckFactory("0100 - 02AF")

