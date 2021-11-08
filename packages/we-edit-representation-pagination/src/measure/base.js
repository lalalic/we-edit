import FontManager from "../fonts"

/**
 * Measure has 
 * ** fonts: 
 * 		> {ascii:Times,ea:宋体, "00FA-FF00":,..., "ascii,ea":"Arial", fallback, hint:"ea"}
 * 			> hint indicates all chars use same scope font family
 * 				> hint also will be resolved in FallbackMeassure
 * 			> fallback will be used if no font scope located in this fonts
 * 
 * 		> string: every char use the same font=>{hint:fontFamily}
 * 
 * ** fallback fonts: 
 * 		> system must make sure all fallback fonts loaded, which must be object
 * 		> {ascii,ea, hansi,...}
 */
export class Measure{
	static caches=new Map()
	static withSameNonMetricStyle(style1,style2){
		return !["vertAlign","underline"].find(k=>style1[k]!==style2[k])
	}
	constructor(style,_dont_decide){
		const {VertAlign_Size=0.5,Super_Script_Position=0.4, withSameNonMetricStyle}=this.constructor
		const {size, vertAlign, bold, italic}=style
		this.style=style
		this.size=size * (vertAlign ? VertAlign_Size : 1);
		
		this.fontFamily=this.__decideFont({...style,Super_Script_Position},_dont_decide)
		if(this.fontFamily){
			this.hit=0

			const cacheKey=this.cacheKey=[this.fontFamily,bold&&'bold',italic&&'italic',this.size].filter(a=>!!a).join("-")
			const caches=this.constructor.caches
			if(caches.has(cacheKey)){
				const cache=caches.get(cacheKey)
				cache.hit++
				console.debug(`measure cache[${cacheKey}]: hit ${cache.hit}`)
				if(withSameNonMetricStyle(this.style,cache.style)){
					return cache
				}else{//share caches
					this.caches=cache.caches
					return this
				}
			}

			caches.set(cacheKey,this)
		}
		this.caches=new Map()
	}

	__decideFont({fonts,bold,italic,vertAlign,underline,Super_Script_Position},_dont_decide){
		if(!fonts){
			throw new Error("No fonts specified for Measure")
		}
		
		const isFallbackFontsMeasure=fonts==this.fallbackFonts

		const getDefaultStyle=(A)=>{
			if(!this.fontFamily){
				/**
				 * @TODO: some place never call stringWidth, such as empty paragraph
				 */
				this.stringWidth(A||"A")
			}
			const fontId=this.font?.postscriptName||[this.fontFamily,bold&&'bold',italic&&'italic'].filter(a=>!!a).join("-")
		
			const defaultStyle={
				whiteSpace:'pre',
				fontSize:`${this.size}px`,
				fontWeight:bold ? "bold" : "normal",
				fontStyle:italic ? "italic" : "normal",
				fontFamily:this.fontFamily,
				['data-postscriptname']: fontId,
				['data-mergeid']: `${fontId}${this.size}${underline&&`.${underline}`||''}`,
			}
	
			const {height, descent, underlinePos, underlineThick}=this.lineHeight()
			defaultStyle.height=this.height=height
			defaultStyle.descent=this.descent=descent
			if(underline){
				defaultStyle.underline={
					kind:underline, 
					pos:underlinePos||descent/2,
					thick:underlineThick||Math.max(Math.round(this.size/10),1)
				}
			}
			if(vertAlign=="superscript"){
				defaultStyle.y=-this.lineHeight().height*Super_Script_Position
			}
			return defaultStyle
		}

		this.fontFamily=(()=>{
			if(typeof(fonts)=="string"){//{ascii:fonts}
				if(_dont_decide)
					return fonts
				fonts={ascii:fonts, hint:"ascii"}
			}
		})();

		if(this.fontFamily){
			this.defaultStyle=getDefaultStyle()
			return this.fontFamily
		}

		const {namedUnicodeScopeChecks,createFromCharCode2FontFunction}=this.constructor
		const resolveCharFontFunctions=Object.keys(fonts).map(range=>{
			const font=fonts[range]
			if(range in namedUnicodeScopeChecks){ 
				return A=>namedUnicodeScopeChecks[range](A) && font
			}else{
				return createFromCharCode2FontFunction(range,namedUnicodeScopeChecks, font)
			}
		})
			
		const fontFamily=this.getCharFontFamily=(A="A",nested)=>{
			A=typeof(A)=="string" ? A.charCodeAt(0) : A
			//1. segmented font
			let reason=1
			let family=resolveCharFontFunctions.reduce((font,resolveCharFont)=>font||resolveCharFont(A), "")

			//2.hint
			if((!family||!this.fontExists(family,A)) && fonts.hint){
				reason=2
				family=fonts[fonts.hint]
			}

			//3.fallback
			if((!family || !this.fontExists(family,A)) && fonts.fallback){
				reason=3
				family=fonts.fallback
			}
			
			if(!isFallbackFontsMeasure){//system fallbacks
				//4. hint in system fallbacks
				if((!family||!this.fontExists(family,A)) && fonts.hint){
					reason=4
					family=this.fallbackFonts[fonts.hint]
				}
				
				//find in system fallbacks
				if((!family||!this.fontExists(family,A))){
					reason=5
					family=this.fallbackFontsMeasure.getCharFontFamily(A,reason)
				}
			}
			if(family){
				console.debug(`Font: '${String.fromCharCode(A)}'[${family}] ${["by segment","by hint","by fallback","by system fallbacks.hint", ""][reason-1]} ${nested>3 ? "in system fallback" : ""}`)
				return family
			}else if(!isFallbackFontsMeasure){
				throw new Error(`Font: can't select font for '${String.fromCharCode(A)}' in both ${JSON.stringify(fonts)} and ${JSON.stringify(this.fallbackFonts)}`)
			}
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

		/**
		 * str must use same font
		 * @param {*} str 
		 */
		this._stringWidth=str=>{
			this.fontFamily=fontFamily(str.charCodeAt(0))
			const measure=measures[this.fontFamily]||(measures[this.fontFamily]=this.clone({fonts:this.fontFamily},true))
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
	
	fontExists(fontFamily, char/*optional, to check if the font support this char*/){
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

	clone(style,_dont_decide){
		return new (this.constructor)({...this.style,...style},_dont_decide)
	}

	static createFromCharCode2FontFunction(
		unicodes/*OOFA-FF[,ea[,FFA0]]*/, 
		namedUnicodeScopeChecks={}/*{ascii(){},ea(){},...}*/, 
		fontFamily
	){
		const scopes=unicodes.split(",").map(a=>a.trim()).filter(a=>!!a)
			.map(seg=>
				seg.split("-").map(a=>a.trim()).filter(a=>!!a).map(a=>{
					return a in namedUnicodeScopeChecks ? a : parseInt(a,16)
				})
			)
			.filter(a=>!!a)
		return A=>{
				const found=scopes.find(([min,max=min])=>{
					if(min in namedUnicodeScopeChecks){
						return namedUnicodeScopeChecks[min](A)
					}else {
						return A>=min && A<=max
					}
				})
				return found ? fontFamily : ""
		}
	}

	static namedUnicodeScopeChecks={
		ascii:	this.createFromCharCode2FontFunction(`
					0000 - 007F,FE70 - FEFE,0590 - 05FF,0600 - 06FF,0700 - 074F,0750 - 077F,0780 - 07BF
				`,{},true),
		ea:		this.createFromCharCode2FontFunction(`
					1100 - 11FF,2F00 - 2FDF,2FF0 - 2FFF,3000 - 303F,3040 - 309F,30A0 - 30FF,3100 - 312F,3130 - 318F,
					3190 - 319F,3200 - 32FF,3300 - 33FF,3400 - 4DBF,4E00 - 9FAF,A000 - A48F,A490 - A4CF,AC00 - D7AF,
					D800 - DB7F,DB80 - DBFF,DC00 - DFFF,F900 - FAFF,FE30 - FE4F,FE50 - FE6F,FF00 - FFEF
				`, {}, true),
	}

	static requireFonts=FontManager.requireFonts
	static applyFont=data=>FontManager.load(data,false)
	static releaseFonts=fonts=>FontManager.release(fonts)

	static fallbackFonts={
		ascii:"Arial",
		ea:"ST",
		fallback:"fallback",
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

	static createMeasureClassWithFallbackFonts=function(fallbackFonts){
		const Type=this
		const fonts=typeof(fallbackFonts)=="string" ? {...this.fallbackFonts, ascii:fallbackFonts} : {...this.fallbackFonts, ...fallbackFonts}
		return class extends Type{
			static fallbackFonts=fonts
		}
	}
}

export default Measure
