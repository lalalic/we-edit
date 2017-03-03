import WordWrapper from "./html"

/**
 *
 * why it's slower than html
 */
let tester=null
export default class SVGWordWrapper extends WordWrapper{
    lineHeight(){
		if(!tester){
			let container=document.createElement("div")
			container.style="position:absolute;top:-1000"
			document.body.appendChild(container)
			const {screenX, screenY}=window
			container.innerHTML=
			`
			<svg width="${screenX}" height="${screenY}" viewBox="0 0 ${screenX} ${screenY}" xmlns="http://www.w3.org/2000/svg">
				<text>*</text>
			</svg>
			`
			tester=container.querySelector('text')
		}
		tester.style=`white-space:pre;
            font-family:${this.fontFamily};
            font-size:${this.size}pt;
            font-weight:${this.style.b ? "700" : "400"};
            font-style:${this.style.i ? "italic" : "normal"};
            `
        return super.lineHeight()
    }

    stringWidth(word){
        tester.firstChild.data=word
        return tester.getBoundingClientRect().width
    }
}
