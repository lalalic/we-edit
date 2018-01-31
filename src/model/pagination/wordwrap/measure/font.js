import Measure from "./measure"
import Fonts from "fonts"

export default class FontMeasure extends Measure{
    lineHeight(){
		this.font=Fonts.get(this.fontFamily)
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
}
