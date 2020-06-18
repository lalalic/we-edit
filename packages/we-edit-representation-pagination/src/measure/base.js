export class Measure{
    constructor(style){
		const {fonts, size}=style
		this.style=style
		this.fontFamilys=fonts.split(",").map(a=>a.trim()).filter(a=>!!a)
        this.fontFamily=this.fontFamilys[0]
		this.size=size
        this.defaultStyle={
			whiteSpace:'pre',
			fontSize:`${size}px`,
			fontWeight:style.bold ? 700 : 400,
			fontStyle:style.italic ? "italic" : "normal",
			fontFamily:this.fontFamily
		}

		const {height, descent}=this.lineHeight()
        this.defaultStyle.height=this.height=height
		this.defaultStyle.descent=this.descent=descent
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
				if(width-state.width>state.width+aWidth-width){
					state.width+=aWidth
					state.text+=a
				}
			}else{
				state.width+=aWidth
				state.text+=a
			}
			return state
		},{width:0,text:"",done:false}).text.length
	}
}

export default Measure
