//import wordwrap from "wordwrap"

var _textComposerTime=0

export default class WordWrapper{
    static tester;

    constructor(text, style){
        this.text=text
        this.style=style

        this.composed=0
    }

    _createTester(){

    }

    _textMetrics(word, style){

    }

    next({width:maxWidth}){
        if(!this.constructor.tester)
            this.constructor.tester=this._createTester()

        if(this.composed==this.text.length)
            return null

        let tester=this.constructor.tester
        let startAt=Date.now()

        let text=null,info=null
        let {width,height}=this._textMetrics(text=this.text.substr(this.composed))
        if(width<=maxWidth){
            info={width,height, end:this.composed+=text.length, children:text}
        }else{
            debugger
            text=text.substr(0,Math.floor(text.length*maxWidth/width))
            ;({width,height}=this._textMetrics(text));

            if(width==maxWidth){
                info={width,height, end:this.composed+=text.length, children:text}
            }else if(width<maxWidth){
                let index=this.composed+text.length, len=this.text.length
                while(width>maxWidth && index<len)
                    ({width, height}=this._textMetrics(text+=this.text.charAt(index++)))
            } else {
                while(width>maxWidth && text.length)
                    ({width, height}=this._textMetrics(text=text.slice(0,-1)))
            }

            if(text.length){
                info={width:maxWidth,height, end:this.composed+=text.length, children:text}
            }else{//@TODO: the space is too small, give a placeholder
                info={width:maxWidth,height, end:this.composed+=text.length, children:text}
            }
        }

        console.info(`text composer total time: ${_textComposerTime+=(Date.now()-startAt)}`)
        return info
    }
}
