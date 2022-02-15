import FontMeasure from "./font"
import BrowserMeasure from "./svg"

/**
 * Map all loaded fonts to browser font face, which is a must in browser, because
 * * browser and we-edit layout engine should use same font for view and layouting
 * 
 * then we can use svg measure in browser to get typeface metrics, height, width, baseline
 * Browser has its own font selection strategy, which may result in different layout between editing and publishing
 * some metrics can't be given from svg measure, such as kerning, 
 * some issues:
 *  TTC must be extracted to single font
 *  hyphenation, can't be supported
 */
export default class HybridMeasure extends FontMeasure{
    static displayName="SVG Measure"
    
    fontExists(family){
        family=super.fontExists(family)?.familyName || family
        return Array.from(document.fonts).find(a=>a.family==family && a.status=="loaded")
    }

    lineHeight(size=this.size){
        if(this.font){
            return super.lineHeight(...arguments)
        }
        console.warn(`Font: font missing, let browser decide`)
        return BrowserMeasure.prototype.lineHeight.call(this, size)
    }

    cssStyle(size=this.size){
        return BrowserMeasure.prototype.cssStyle.call(this, size)
    }

    _stringWidth(word){
        if(this.font){
            return super._stringWidth(word)
        }
        console.warn(`Font: font missing, let browser decide`)
        return BrowserMeasure.prototype._stringWidth.call(this,word)
    }

    static requireFonts(service, fonts){
        return BrowserMeasure.requireFonts()
            .then(()=>super.requireFonts(service, Array.from(new Set([...fonts])))
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
            }))
    }
}


