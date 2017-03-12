var _textComposerTime=0
export default class WordWrapper{
    constructor(text, style){
		const {rFonts, sz:fontSize}=style
		this.style=style
        this.text=text
        this.fontFamily=typeof(rFonts)=="string" ? rFonts : Object.keys(rFonts).map(a=>`${typeof(rFonts[a])=='string'? rFonts[a] : ''}`)
            .filter(a=>a).join(" ")
		this.size=fontSize
		const {height, descent}=this.lineHeight()
        this.height=Math.ceil(height)
		this.descent=Math.ceil(descent)

		this.defaultStyle={
			whiteSpace:'pre',
			fontSize:`${this.size}pt`,
			fontWeight:style.b ? 700 : 400,
			fontStyle:style.i ? "italic" : "normal",
			height: this.height,
			descent: this.descent,
			fontFamily:this.fontFamily
		}

		if(style.color)
			this.defaultStyle.fill=style.color
    }

	lineHeight(){
		return {height:25,descent:2}
	}

	stringWidth(string){
		return 200
	}
}
