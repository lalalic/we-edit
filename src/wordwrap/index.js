var _textComposerTime=0
export default class WordWrapper{
    constructor(text, style){
		const {rFonts, sz:fontSize}=style
		this.style=style
        this.text=text
        this.fontFamily=Object.keys(rFonts).map(a=>`${typeof(rFonts[a])=='string'? rFonts[a] : ''}`)
            .filter(a=>a).join(" ")
		this.size=fontSize
		const {height, descent}=this.lineHeight()
        this.height=Math.ceil(height)
		this.descent=Math.ceil(descent)
        this.composed=0

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

    next({len, width:maxWidth, greedy=a=>true, wordy=a=>true}){
        let info=null
        if(len){//by char length
            let text=this.text.substr(this.composed,len)
            let width=this.stringWidth(text)
            info={width,children:text, contentWidth:width, end:this.composed+=len}
        }else{//by width
            if(maxWidth==undefined)
    			throw new Error("no max width specified when composing text")

    		if(this.composed==this.text.length)
                return null
			
			//let {text, width}=this.measure(this.text,this.composed,maxWidth)
			let text,width
            width=this.stringWidth(text=this.text.substr(this.composed))
            if(width<=maxWidth){
                info={width, contentWidth:width, end:this.composed+=text.length, children:text}
            }else{
    			{//how can we quickly measure
    				let smartTypeText=text.substr(0,Math.floor(text.length*maxWidth/width))
    				if(smartTypeText.length>0){
    					width=this.stringWidth(text=smartTypeText)
    				}

    				if(width<maxWidth){
    					let index=this.composed+text.length, len=this.text.length
    					while(width<maxWidth && index<len)
    						width=this.stringWidth(text+=this.text.charAt(index++))
    				}

    				if(width>maxWidth){
    					while(width>maxWidth && text.length)
    						width=this.stringWidth(text=text.slice(0,-1))
    				}
    			};

                if(text.length){
    				let end=this.composed+text.length
    				if(end<this.text.length && greedy(text)){
    					//greedy
    					let chr
    					while(!isChar(chr=this.text.charAt(end))){
    						text+=chr
    						end++
    					}
    				}

    				//wordy
    				if(wordy(text, this.composed+text.length==this.text.length)){
    					while(text.length && isChar(text.charAt(text.length-1))){
    						text=text.substr(0,text.length-1)
    					}
    					if(text.length==0)
    						width=0
    				}

                    info={width:width, contentWidth: width, end:this.composed+=text.length, children:text}
                }else{//@TODO: the space is too small
                    info={width:maxWidth, contentWidth:0, end:this.composed+=text.length, children:text}
                }
            }
        }

		info.width=Math.ceil(info.width)
        return {...this.defaultStyle,...info}
    }
	
	measure(str, start, maxWidth){
		let text=str.substr(start)
		let width=this.stringWidth(text)
		if(width<=maxWidth)
			return {text,width}
		return this._measureByRatio(str, start, maxWidth, width)
	}
	
	_measureByRatio(str, start, maxWidth, width){//how can we quickly measure
		if(width==undefined)
			width=this.stringWidth(str)
		
		let text=str.substr(0,Math.floor(str.length*maxWidth/width))
		if(text.length>0)
			width=this.stringWidth(text)
		

		if(width<maxWidth){
			let index=start+text.length, len=str.length
			while(width<maxWidth && index<len)
				width=this.stringWidth(text+=str[index++])
		}

		while(width>maxWidth && text.length)
			width=this.stringWidth(text=text.slice(0,-1))
		
		return {text,width}
	}

    rollback(len){
        this.composed-=len
    }
}

export function isChar(chr){
	return " \t\n\r,.".indexOf(chr)==-1
}

export function isWhitespace(a){
    return a===' '||a==='\t' || a==='\n' || a==='\r'
}

export function find(str,condition){
	return [...str].reduce((state,a)=>{
		if(!state.end){
			if(condition(a))
				state.found+=a
			else
				state.end=true
		}
		return state
	},{found:"",end:false}).found
}

export function testAll(str, condition){
	return [...str].reduce((state,a)=>state&&condition(a),true)
}

export function isWord(str){
	return testAll(str,isChar)
}
