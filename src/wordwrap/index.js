var _textComposerTime=0
export default class WordWrapper{
    constructor(text, style){
		const {rFonts, sz:fontSize}=style
		this.style=style
        this.text=text
        this.fontFamily=Object.keys(rFonts).map(a=>`'${rFonts[a]}'`).join(" ")
		this.size=fontSize
        this.height=this.lineHeight()
        this.composed=0
    }
	
	lineHeight(){
		return 25
	}
	
	stringWidth(string){
		return 200
	}
	
    next({width:maxWidth}){
        if(maxWidth==undefined)
			throw new Error("no max width specified when composing text")
		
		if(this.composed==this.text.length)
            return null
	
        let startAt=Date.now()

        let text=null,info=null
        let width=this.stringWidth(text=this.text.substr(this.composed))
        if(width<=maxWidth){
            info={width, contentWidth:width, end:this.composed+=text.length, children:text}
        }else{
            text=text.substr(0,Math.floor(text.length*maxWidth/width))
            width=this.stringWidth(text)

            if(width==maxWidth){
                info={width, end:this.composed+=text.length, children:text}
            }else if(width<maxWidth){
                let index=this.composed+text.length, len=this.text.length
                while(width>maxWidth && index<len)
                    width=this.stringWidth(text+=this.text.charAt(index++))
            } else {
                while(width>maxWidth && text.length)
                    width=this.stringWidth(text=text.slice(0,-1))
            }

            if(text.length){
                info={width:maxWidth, contentWidth: width, end:this.composed+=text.length, children:text}
            }else{//@TODO: the space is too small, give a placeholder
                info={width:maxWidth, contentWidth:0, end:this.composed+=text.length, children:text}
            }
        }

        console.info(`text composer total time: ${_textComposerTime+=(Date.now()-startAt)}`)
        return Object.assign(info,{
				fontFamily:this.fontFamily,
				fontSize:this.size,
				height:this.height
			})
    }
}
