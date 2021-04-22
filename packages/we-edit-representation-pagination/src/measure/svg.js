import memoize from "memoize-one"
import FontMeasure from "./font"

/**
 *
 * why it's slower than html
 */
let tester=null
export default class SVGMeasure extends FontMeasure{
    static displayName="SVG Measure"
    static fallbackFonts={
        ...super.fallbackFonts,
        ascii:"Times New Roman",
        ea:"Songti TC",
    }

    fontExists(family){
        return !!Array.from(document.fonts).find(a=>a.family==family && a.status=="loaded")
    }

    lineHeight(size=this.size){
        if(this.font){
            return super.lineHeight(...arguments)
        }
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
        if(this.font){
            return super._stringWidth(word)
        }
        tester.setStyle(this.cssStyle(this.size))
        tester.firstChild.data=word
        return tester.getBBox().width
    }

    static WebFonts=["Arial","Courier New","Georia","Times New Roman","Trebuchet MS","Verdana"]

    static requireFonts(service, fonts){
        return super.requireFonts(service, Array.from(new Set([...fonts,...this.WebFonts])))
            .then(({FontManager,unloaded})=>{
                const locals=unloaded
                if(locals && locals.length){
                    console.warn(`Try browser local fonts: [${locals.join(",")}]`)
                    locals.forEach(a=>FontManager.makeFontFace({familyName:a},`local("${a}")`))
                }
                const names=fonts.map(a=>FontManager.get(a)?.familyName||a)
                const faces=Array.from(document.fonts).filter(a=>names.includes(a.family))
                return Promise.all(
                    faces
                        .map(a=>new Promise(resolve=>{
                            return a.loaded
                            .then(()=>resolve(),()=>resolve(a))
                        }))
                ).then(required=>{
                    let unloaded=required.filter(a=>!!a)
                    if(unloaded.length){
                        unloaded.forEach(a=>{
                            FontManager.removeFontFace(a)
                        })
                        unloaded=Array.from(new Set(unloaded.map(a=>[a.family,a.style,a.weight].filter(a=>a!=="normal").join("/"))))
                    }
                    const errors=unloaded.filter(a=>locals.includes(a))
                    return {FontManager,unloaded, errors}
                })
            })
    }
}
