import Measure from "./base"
import memoize from "memoize-one"

/**
 *
 * why it's slower than html
 */
let tester=null
export default class SVGMeasure extends Measure{
    lineHeight(){
		if(!tester){
			let container=document.createElement("div")
			container.style="position:absolute;top:-1000px"
			document.body.appendChild(container)
			container.innerHTML=`<svg viewBox="0 0 ${100} ${100}" xmlns="http://www.w3.org/2000/svg"><text>Ä</text></svg>`
			tester=container.querySelector('text')
            tester.setStyle=memoize(style=>tester.style=style)
		}
		tester.setStyle(this.cssStyle())
        tester.firstChild.data="Ä"
        const {height,y, baseline=-y}=tester.getBBox()
        return {height,descent:height-baseline}
    }

    cssStyle(){
        return `white-space:pre;
            font-family:${this.fontFamily};
            font-size:${this.size}pt;
            font-weight:${this.style.bold ? "700" : "400"};
            font-style:${this.style.italic ? "italic" : "normal"};
            `
    }

    stringWidth(word){
		tester.setStyle(this.cssStyle())
        tester.firstChild.data=word
        return tester.getBBox().width
    }
}
