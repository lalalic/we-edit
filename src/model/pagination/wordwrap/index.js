var _textComposerTime=0
export default class WordWrapper{
    constructor(style){
		const {fonts, size, color}=style
		this.style=style
        this.fontFamily=Object.keys(fonts).reduce((values,k)=>{
			values.push(fonts[k])
			return values
		},[]).join(",")
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
	
	widthString(width,string){
		return Array.prototype.reduce.call(string,(state,a)=>{
			if(state.done)
				return state
			
			let aWidth=this.stringWidth(a)
			if(state.width+aWidth>width){
				state.done=true
			}else{
				state.width+=aWidth
				state.text+=a
			}
			return state
		},{width:0,text:"",done:false}).text.length
	}
}
