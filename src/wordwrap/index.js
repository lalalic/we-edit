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
            let smartTypeText=text.substr(0,Math.floor(text.length*maxWidth/width))
			if(smartTypeText.length>0){
				width=this.stringWidth(text=smartTypeText)
			}

            if(width==maxWidth){
                info={width, contentWidth: width, end:this.composed+=text.length, children:text}
            }else if(width<maxWidth){
                let index=this.composed+text.length, len=this.text.length
                while(width<maxWidth && index<len)
                    width=this.stringWidth(text+=this.text.charAt(index++))
            } else {
                while(width>maxWidth && text.length)
                    width=this.stringWidth(text=text.slice(0,-1))
            }

            if(text.length){
				let end=this.composed+text.length
				if(end<this.text.length){
					//greedy
					while(isWhitespace(this.text.charAt(end))){
						text+=" "
						end++
					}
				}
				
				while(text.length && !isWhitespace(text.charAt(text.length-1))){
					text=text.substr(0,text.length-1)
				}
				
                info={width:maxWidth, contentWidth: width, end:this.composed+=text.length, children:text}
            }else{//@TODO: the space is too small, give a placeholder
                info={width:maxWidth, contentWidth:0, end:this.composed+=text.length, children:text}
            }
        }

		info.width=Math.ceil(info.width)
        return Object.assign(info,this.defaultStyle)
    }
}

function isWhitespace(chr){
	return chr===' '
		|| chr==='\n'
		|| chr==='\r'
		|| chr==='\t'
}