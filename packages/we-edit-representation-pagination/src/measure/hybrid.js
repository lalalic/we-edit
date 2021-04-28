import FontMeasure from "./font"
import BrowserMeasure from "./svg"

export default class HybridMeasure extends FontMeasure{
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
        return BrowserMeasure.prototype.lineHeight.call(this, size)
    }

    cssStyle(size=this.size){
        return BrowserMeasure.prototype.cssStyle.call(this, size)
    }

    _stringWidth(word){
        if(this.font){
            return super._stringWidth(word)
        }
        return BrowserMeasure.prototype._stringWidth(word)
    }

    static requireFonts(service, fonts){
        return super.requireFonts(service, Array.from(new Set([...fonts,...BrowserMeasure.WebFonts])))
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


