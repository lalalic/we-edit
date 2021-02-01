import FontManager from "../fonts"

/**
 * Measure has 
 * ** fonts: 
 * 		> {ascii:Times,ea:宋体, "00FA-FF00":,...}
 * 			> hint specifies all chars use same domain font family
 * 
 * 		> string: every char use the same font=>{ascii:fontFamily}
 * 
 * 		> if Object.keys(fonts).length==1, the key also be used for fallback fonts of all chars
 * 			eg: {ascii:"NoFont"} only fallback to fallbackFonts.ascii, {ea:""} =>fallbackFonts.ea
 * 
 * ** fallback fonts: 
 * 		> system must make sure all fallback fonts loaded, which must be object
 * 		> {ascii,ea, hansi,...}
 */

function toUnicodeCheck(unicodes,name="undecided"){
	unicodes=unicodes.split(",").map(a=>a.trim()).filter(a=>!!a)
	.map(seg=>
		seg.split("-").map(a=>a.trim()).filter(a=>!!a).map(a=>{
			return parseInt(a,16)
		})
	)
	return A=>unicodes.find(([min,max=min])=>A>=min && A<=max) ? name : ""
}

export class Measure{
	static caches=new Map()
	constructor(style){
		const {VertAlign_Size=0.5,Super_Script_Position=0.4}=this.constructor
		const {size, vertAlign, bold, italic}=style
		this.style=style
		this.size=size * (vertAlign ? VertAlign_Size : 1);
		this.caches=new Map()

		this.fontFamily=this.decideFont({...style,Super_Script_Position})
		if(this.fontFamily){
			this.hit=0

			const cacheKey=[this.fontFamily,this.size,bold&&'bold',italic&&'italic'].filter(a=>!!a).join("-")
			const caches=this.constructor.caches
			if(caches.has(cacheKey)){
				const cache=caches.get(cacheKey)
				cache.hit++
				console.debug(`measure cache[${cacheKey}]: hit ${cache.hit}`)
				return cache
			}

			caches.set(cacheKey,this)
		}
	}

	decideFont({fonts,bold,italic,vertAlign,Super_Script_Position}){
		if(!fonts){
			debugger
		}
		const isFallbackFontsMeasure=fonts==this.fallbackFonts

		const getDefaultStyle=()=>{
			const defaultStyle={
				whiteSpace:'pre',
				fontSize:`${this.size}px`,
				fontWeight:bold ? "bold" : "normal",
				fontStyle:italic ? "italic" : "normal",
				fontFamily:this.fontFamily,
			}
	
			const {height, descent}=this.lineHeight()
			defaultStyle.height=this.height=height
			defaultStyle.descent=this.descent=descent
			if(vertAlign=="superscript"){
				defaultStyle.y=-this.lineHeight().height*Super_Script_Position
			}
			return defaultStyle
		}

		this.fontFamily=(()=>{
			if(typeof(fonts)=="string"){//{ascii:fonts}
				fonts={ascii:fonts}
			}

			const keys=Object.keys(fonts), hint=keys[0]
			if(keys.length==1){//every char use same font, and key also used to fallback
				 return this.fontExists(fonts[hint]) ? fonts[hint] : this.fallbackFonts[hint]
			}else if(new Set(Object.values(fonts)).length==1){
				if(this.fontExists(fonts[hint])){
					return fonts[hint]
				}
			}
		})();
		if(this.fontFamily){
			this.defaultStyle=getDefaultStyle()
			return this.fontFamily
		}

		const checks=this.constructor.checks
		const types=Object.keys(fonts).map(range=>{
			let fn
			const font=fonts[range]
			return A=>{
				if(checks[range]){
					return checks[range](A) && font
				}else{
					return (fn||(fn=toUnicodeCheck(range,font)))(A)
				}
			}
		})
			
		const fontFamily=this.getCharFontFamily=(A)=>{
			let family=types.reduce((type,fn)=>type||fn(A), "")
			if(!family && !checks.ascii(A)&&!checks.ea(A)){
				family=fonts.hansi
			}
			
			if(!(family && this.fontExists(family)) && !isFallbackFontsMeasure){
				family=this.fallbackFontsMeasure.getCharFontFamily(A)
			}
			return family
		}

		this.break=str=>{
			let top, parsed=[top=[str[0]]], last=fontFamily(str.charCodeAt(0))
			for(let i=1, cur, len=str.length;i<len;i++){
				cur=fontFamily(str.charCodeAt(i))
				if(cur==last){
					top.push(str[i])
				}else{
					parsed.push(top=[str[i]])
					last=cur
				}
			}
			return parsed.map(a=>a.join(""))
		}

		const measures={}

		this._stringWidth=str=>{
			this.fontFamily=fontFamily(str.charCodeAt(0))
			const measure=measures[this.fontFamily]||(measures[this.fontFamily]=this.clone({fonts:this.fontFamily}))
			return measure._stringWidth(str)
		}

		Object.defineProperties(this,{
			defaultStyle:{
				get(){
					return getDefaultStyle()
				}
			}
		})
	}
	
	fontExists(font){
		return true
	}

	getCharFontFamily(a){
		return this.fontFamily
	}

	lineHeight(size){
		return {height:25,descent:2}
	}

	stringWidth(word){
		if(this.caches.has(word))
			return this.caches.get(word)
		const w=this._stringWidth(word)
		this.caches.set(word, w)
		return w
	}

	_stringWidth(string){
		return string.length
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

	/**
	 * break according to fonts
	 * @param {*} str 
	 */
	break(str){
		return str
	}

	clone(style){
		return new (this.constructor)({...this.style,...style})
	}

	static checks={
		ascii:	toUnicodeCheck("0000 - 007F,FE70 - FEFE,0590 - 05FF,0600 - 06FF,0700 - 074F,0750 - 077F,0780 - 07BF"),
		ea:	toUnicodeCheck(`
					1100 - 11FF,2F00 - 2FDF,2FF0 - 2FFF,3000 - 303F,3040 - 309F,30A0 - 30FF,3100 - 312F,3130 - 318F,
					3190 - 319F,3200 - 32FF,3300 - 33FF,3400 - 4DBF,4E00 - 9FAF,A000 - A48F,A490 - A4CF,AC00 - D7AF,
					D800 - DB7F,DB80 - DBFF,DC00 - DFFF,F900 - FAFF,FE30 - FE4F,FE50 - FE6F,FF00 - FFEF
				`),
		cs: A=>false, 
		hansi: A=>false, // fallback of ascii && ea in code
	}

	static requireFonts=FontManager.requireFonts

	static fallbackFonts={
		ascii:"Arial",
		ea:"ST",
	}

	get fallbackFonts(){
		return this.constructor.fallbackFonts
	}

	get fallbackFontsMeasure(){
		if(!this.constructor.fallbackFontsMeasure){
			this.constructor.fallbackFontsMeasure=new this.constructor({fonts:this.fallbackFonts})
		}
		return this.constructor.fallbackFontsMeasure
	}

	static createFallbackFontsMeasure=function(fallbackFonts){
		const Type=this
		const fonts=typeof(fallbackFonts)=="string" ? {...this.fallbackFonts, ascii:fallbackFonts} : {...this.fallbackFonts, ...fallbackFonts}
		return class extends Type{
			static fallbackFonts=fonts
		}
	}
}

export default Measure
