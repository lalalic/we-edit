export class Measure{
	static caches=new Map()
	constructor(style){
		const {VertAlign_Size=0.5,Super_Script_Position=0.4}=this.constructor
		const {fonts, size, vertAlign, bold, italic}=style
		this.style=style
		this.fontFamilys=fonts.split(",").map(a=>a.trim()).filter(a=>!!a)
        this.fontFamily=this.fontFamilys[0]
		this.size=size * (vertAlign ? VertAlign_Size : 1);
		this.hit=0

		const cacheKey=`${this.fontFamily}-${this.size}-${bold}-${italic}`
		const caches=this.constructor.caches
		if(caches.has(cacheKey)){
			const cache=caches.get(cacheKey)
			cache.hit++
			console.log(`measure cache[${cacheKey}]: hit ${cache.hit}`)
			return cache
		}
		caches.set(cacheKey,this)

        this.defaultStyle={
			whiteSpace:'pre',
			fontSize:`${this.size}px`,
			fontWeight:style.bold ? 700 : 400,
			fontStyle:style.italic ? "italic" : "normal",
			fontFamily:this.fontFamily,
		}

		const {height, descent}=this.lineHeight()
        this.defaultStyle.height=this.height=height
		this.defaultStyle.descent=this.descent=descent
		if(vertAlign=="superscript"){
			this.defaultStyle.y=-this.lineHeight(size).height*Super_Script_Position
		}
	}

	lineHeight(size){
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
