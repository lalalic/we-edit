import Measure from "./base"
import FontKit from "fontkit"
import arial from "!!file-loader?name=[name].[ext]!../fonts/Arial.ttf"
import createFallbackFont from "../fonts/fallback-font"
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

	static requireFonts(){
		return super.requireFonts(...arguments)
			.then(result=>{
				return globalThis.fetch(arial)
					.then(res=>res.arrayBuffer())
					.then(data=>FontManager.load(data))
					.then(font=>createFallbackFont(font))
					.then(data=>{
						const name="Fallback", names=["familyName","postscriptName","fullName"]
						const font=FontKit.create(Buffer.from(data))
						return new Proxy(font,{
							get(font,key){
								if(names.includes(key))
									return name
								return Reflect.get(...arguments)
							}
						})
					})
				.then(font=>makeFontFace(font),e=>console.warn(e))
				.then(()=>result)
			})
	}
}
