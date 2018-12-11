import HtmlMeasure from "./html"
import {getClientRect} from "we-edit"

/**
 *
 * why it's slower than html
 */
let tester=null
export default class SVGMeasure extends HtmlMeasure{
    /*
    lineHeight(){
		if(!tester){
			let container=document.createElement("div")
			container.style="position:absolute;top:-1000px"
			document.body.appendChild(container)
			const {screenX, screenY}=window
			container.innerHTML=
			`
			<svg width="${screenX}" height="${screenY}" viewBox="0 0 ${screenX} ${screenY}" xmlns="http://www.w3.org/2000/svg">
				<text>Ä</text>
			</svg>
			`
			tester=container.querySelector('text')
		}
		tester.style=`white-space:pre;
            font-family:${this.fontFamily};
            font-size:${this.size}pt;
            font-weight:${this.style.bold ? "700" : "400"};
            font-style:${this.style.italic ? "italic" : "normal"};
            `
        return super.lineHeight()
    }


    stringWidth(word){
		tester.style=`white-space:pre;
            font-family:${this.fontFamily};
            font-size:${this.size}pt;
            font-weight:${this.style.bold ? "700" : "400"};
            font-style:${this.style.italic ? "italic" : "normal"};
            `
        tester.firstChild.data=word
        return getClientRect(tester).width
    }
    */
}
