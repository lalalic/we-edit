export default class Measure{
    constructor({size}){
        this.style=arguments[0]
        this.defaultStyle={height:size,descent:1}
        this.height=size
    }

    widthString(x,text){
        return Math.min(x,text.length)
    }

    stringWidth(text){
        return text.length
    }

    break(a){
        return a
    }

    static fallbackFontsMeasure(){
        return this
    }

    static requireFonts(){
        return Promise.resolve({unloaded:[]})
    }

    static releaseFonts(){
        
    }
}

it("",()=>{})