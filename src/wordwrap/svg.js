import WordWrapper from "."

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
		tester.style=`font-family:${this.fontFamily};font-size:${this.size}px;white-space:pre;`
		tester.firstChild.data="A"
        return tester.getBoundingClientRect().height
    }

    stringWidth(word){
        tester.firstChild.data=word
        return tester.getBoundingClientRect().width
    }
}
