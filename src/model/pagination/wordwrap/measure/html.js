import Measure from "./measure"
import getClientRect from "tools/get-client-rect"

let tester=null
let DEFAULT_STYLE="margin:0;padding:0;border:0;position:absolute;left:-1000px;white-space: pre;"
export default class HtmlMeasure extends Measure{
	lineHeight(){
		if(!tester){
			tester=document.createElement('span')
			document.body.appendChild(tester)
		}

		var p=document.createElement('p')
		document.body.appendChild(p)
		tester.style=p.style=`${DEFAULT_STYLE};font-family:${this.fontFamily};font-size:${this.size}pt`
		p.style.vertialAlign="baseline"
		p.innerHTML=`<span style="${DEFAULT_STYLE}">Ä</span><div style="display: inline-block; width: 1px; height: 0px;"></div>`
		let {height, top}=getClientRect(p)
		let {top:baseline}=getClientRect(p.querySelector('div'))
		document.body.removeChild(p)
		let descent=height-(baseline-top)
		return {height, descent: height-(baseline-top)}
	}

    stringWidth(word){
        tester.innerHTML=word
        return getClientRect(tester).width
    }
}
