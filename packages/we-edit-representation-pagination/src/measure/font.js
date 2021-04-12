import Measure from "./base"
import FontManager from "../fonts"

export default class FontMeasure extends Measure{
	static displayName="Font Measure"
	get font(){
		return this.__font||(this.__font=FontManager.get(this.fontFamily, this.style))
	}

	fontExists(family){
		return !!FontManager.get(family)
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
