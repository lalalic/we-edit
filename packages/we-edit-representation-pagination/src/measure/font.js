import Measure from "./base"
import Fonts from "../fonts"
import {default as isNode} from "is-node"

export default class FontMeasure extends Measure{
	getFont(){
		return Fonts.get(this.fontFamily)
	}

    lineHeight(){
		this.font=this.getFont()
        return {
			height : this.font.lineHeight(this.size)*96/72,
			descent: this.font.lineDescent(this.size)*96/72
		}
    }

    stringWidth(input){
		let fontSize=this.size
        const glyphs = this.font.stringToGlyphs(input);
		const scale = 1 / this.font.unitsPerEm * fontSize;
		let width = 0;
		for (let i=0; i<glyphs.length; i++) {
			let glyph = glyphs[i];
			if (glyph.advanceWidth) {
				width += glyph.advanceWidth * scale;
			}
			if (i < glyphs.length - 1) {
				width += this.font.getKerningValue(glyph, glyphs[i + 1]) * scale;
			}
		}
		return width*96/72;
    }

	static requireFonts(fonts, service){
		const done=()=>{
			let errors=fonts.filter(a=>{
				try{
					Fonts.get(a)
					return false
				}catch(e){
					return true
				}
			})
			if(errors.length)
				return Promise.reject(errors)
		}

		if(isNode){
			return Fonts.fromPath(service,fonts)
				.then(done,done)
		}else{
			if(!service)
				return Promise.resolve(done())

			return Promise.all(fonts.map(a=>Fonts.load(`${service}${a}.ttf`,a)))
				.then(done,done)
		}
	}
}
