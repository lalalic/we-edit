import Measure from "./base"
import {getClientRect} from "we-edit"

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
		tester.style=p.style=this.inlineStyle
		p.style.vertialAlign="baseline"
		p.innerHTML=`<span style="${DEFAULT_STYLE}">Ä</span><div style="display: inline-block; width: 1px; height: 0px;"></div>`
		let {height, top}=getClientRect(p)
		let {top:baseline}=getClientRect(p.querySelector('div'))
		document.body.removeChild(p)
		return {height, descent: height-(baseline-top)}
	}

	get inlineStyle(){
		return `${DEFAULT_STYLE};font-family:${this.defaultStyle.fontFamily};font-size:${this.defaultStyle.fontSize};font-weight:${this.defaultStyle.fontWeight};`
	}


    stringWidth(word){
		tester.style=this.inlineStyle
        tester.innerHTML=word
        return getClientRect(tester).width
    }
}
