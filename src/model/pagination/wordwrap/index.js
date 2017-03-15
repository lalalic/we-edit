var _textComposerTime=0
export default class WordWrapper{
    constructor(text, style){
		const {fonts, size, color}=style
		this.style=style
        this.text=text
        this.fontFamily=fonts
		this.size=size
		const {height, descent}=this.lineHeight()
        this.height=Math.ceil(height)
		this.descent=Math.ceil(descent)

		this.defaultStyle={
			whiteSpace:'pre',
			fontSize:`${size}pt`,
			fontWeight:style.bold ? 700 : 400,
			fontStyle:style.italic ? "italic" : "normal",
			height: this.height,
			descent: this.descent,
			fontFamily:this.fontFamily
		}

		if(color)
			this.defaultStyle.fill=color
    }

	lineHeight(){
		return {height:25,descent:2}
	}

	stringWidth(string){
		return 200
	}
}
