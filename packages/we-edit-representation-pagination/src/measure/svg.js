import memoize from "memoize-one"
import Base from "./base"

let tester=null
export default class BrowserMeasure extends Base{
    static displayName="Browser Measure"
    constructor({fonts, ...style}){
        super({...style,fonts},true)
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

    cssStyle(size=this.size){
        return `white-space:pre;
            font-family:${this.fontFamily};
            font-size:${size}px;
            font-weight:${this.style.bold ? "bold" : "normal"};
            font-style:${this.style.italic ? "italic" : "normal"};
            `
    }

    _stringWidth(word){
        tester.setStyle(this.cssStyle(this.size))
        tester.firstChild.data=word
        return tester.getBBox().width
    }

    static WebFonts=["Arial","Courier New","Georia","Times New Roman","Trebuchet MS","Verdana"]

    static requireFonts(service, fonts){
        document.dispatchEvent(new CustomEvent(
            'fontLoaded',
            {detail:{fonts:Array.from(new Set([...fonts,...this.WebFonts])).map(family=>({family}))}}
        ))
        return Promise.resolve({unloaded:[], error:[]})
    }
}


