import Measure from "./base"
import FontManager from "../fonts"
export default class FontMeasure extends Measure{
	static displayName="Font Measure"
	get font(){
		return FontManager.get(this.fontFamily, this.style)
	}

	fontExists(family, char){
		if(typeof(char)=="string")
			char=char.charCodeAt(0)
		const font=FontManager.get(family)
		if(font && char && !font.hasGlyphForCodePoint(char)){
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
}
