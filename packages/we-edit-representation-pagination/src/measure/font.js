import Measure from "./base"
import arial from "!!file-loader?name=[name].[ext]!../fonts/Arial.ttf"
import createFallbackFont from "../fonts/fallback-font"
import FontManager from "../fonts"
import {makeFontFace} from "../fonts/font-face"
export default class FontMeasure extends Measure{
	static displayName="Font Measure"
	get font(){
		return FontManager.get(this.fontFamily, this.style)
	}

	fontExists(family, char){
		const font=FontManager.get(family)
		if(font && char && !font.hasGlyphForCodePoint(char.charCodeAt(0))){
			return
		}
		return font
	}

	lineHeight(size=this.size){
		return {
			height : this.font.lineHeight(size),
			descent: this.font.lineDescent(size),
			underlinePos: Math.floor(-(this.font.underlinePosition||-100)*size/2000),
			underlineThick: Math.floor((this.font.underlineThickness||50)*size/2000),
		}
    }

    _stringWidth(input){
		return this.font.stringWidth(input,this.size)
    }

	static requireFonts(){
		return super.requireFonts(...arguments)
			.then(result=>{
				return globalThis.fetch(arial)
					.then(res=>res.arrayBuffer())
					.then(data=>FontManager.load(data))
					.then(font=>createFallbackFont(font))
					.then(font=>makeFontFace(font,null,{
						family:"fallback",
						unicodeRange:"U+0000-FFFF",
					}),e=>console.warn(e))
					.then(()=>result)
			})
	}
}
