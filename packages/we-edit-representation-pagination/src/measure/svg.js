import Measure from "./base"
import memoize from "memoize-one"

/**
 *
 * why it's slower than html
 */
let tester=null
export default class SVGMeasure extends Measure{
    decideFont(fonts){
        if(typeof(fonts)!="object")
            return super.decideFont(fonts)

        const decide=Object.keys(fonts).map(k=>{
            const ranges=fonts[k].split(",").map(a=>a.trim()).filter(a=>!!a)
                .map(a=>a.split("-").map(a=>a.trim()).filter(a=>!!a).map(a=>{
                    console.log('parsing ' +a)
                    return parseInt(a,16)
                }))
                .map(([min,max=min])=>(code=>{
                    console.log({code,min,max})
                    return code>=min && code<=max
                }))
            return code=>{
                if(ranges.find(a=>a(code))){
                    return k
                }
            }
        })

        this._decide=code=>decide.reduce((found,fn)=>(found || fn(code)),"")
        return this._decide("A".charCodeAt(0))
    }

    lineHeight(size=this.size){
		if(!tester){
			let container=document.createElement("div")
			container.style="position:absolute;top:-1000px"
			document.body.appendChild(container)
			container.innerHTML=`<svg viewBox="0 0 ${100} ${100}" xmlns="http://www.w3.org/2000/svg"><text>Ä</text></svg>`
			tester=container.querySelector('text')
            tester.setStyle=memoize(style=>tester.style=style)
		}
		tester.setStyle(this.cssStyle(size))
        tester.firstChild.data="Ä"
        const {height,y, baseline=-y}=tester.getBBox()
        return {height,descent:height-baseline}
    }

    cssStyle(size=this.size, family=this.fontFamily){
        return `white-space:pre;
            font-family:${family};
            font-size:${size}px;
            font-weight:${this.style.bold ? "700" : "400"};
            font-style:${this.style.italic ? "italic" : "normal"};
            `
    }

    _stringWidth(word){
        tester.setStyle(this.cssStyle(this.size,this.getFamily(word)))
        tester.firstChild.data=word
        return tester.getBBox().width
    }

    getFamily(word){
        if(typeof(this.style.fonts)=="object"){
            return this._decide(word.charCodeAt(0))
        }
        return this.fontFamily
    }
}
