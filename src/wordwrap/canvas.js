import WordWrapper from "."

let canvas=null, ctx2d=null
export default class CanvasWordWrapper extends WordWrapper{
    lineHeight(){
		if(!ctx2d){
			canvas=document.createElement('canvas')
			document.body.appendChild(canvas)
			canvas.style="margin:0;padding:0;border:0;position:absolute;left:-1000px"
			ctx2d=canvas.getContext('2d')
		}
		canvas.style=`font-family:${this.fontFamily};font-size:${this.fontSize}`
        return ctx2d.measureText("A").height
    }

    stringWidth(word){
        return ctx2d.measureText(word).width
    }
}
