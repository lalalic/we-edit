
/**
 * FontFace added through document.fonts, or @fontface rule
 * when remove a fontface, both need be checked
 */
var fontFaces=null, loader=null
export function makeFontFace(font, src , variants){
    if(!document?.createElement || !FontFace)
        return 
    if(!fontFaces){
        loader=document.body.appendChild(document.createElement('div'))
        loader.id='we_edit_font_loader'
        fontFaces=loader.appendChild(document.createElement("style"))
        fontFaces.id="we_edit_font_face"
    }
    const id=toName(font.familyName)
    const idFontLoader=(()=>{
        try{
            return loader.querySelector(`#${id}`)
        }catch(e){
            console.warn(`'${font.familyName}' is valid font family name. ${e.message}`)
            return false
        }
    })();
    if(idFontLoader===false)
        return 

    if(!src){//font data
        variants={...variants}
        if(font.bold){
            variants.weight="bold"
        }
        if(font.italic){
            variants.style="italic"
        }
        if(font.oblique){
            variants.style="oblique"
        }
        const nativeFont=new FontFace(font.familyName, font.stream.buffer, variants)
        document.fonts.add(nativeFont)
    }else{//local, url, service
        fontFaces.sheet.addRule('@font-face',`
            font-family:"${font.familyName}";
            src: ${src};
            ${font.bold ? 'font-weight:bold;' : ''}
            ${font.italic ? 'font-style:italic;' : ''}
            ${font.oblique ? 'font-style:oblique;' : ''}
        `)
    }

    if(idFontLoader){
        return 
    }

    const span=loader.appendChild(document.createElement('span'))
    span.id=id
    span.style.fontFamily=font.familyName
    //load normal, bold, italic, and boldItalic
    span.innerHTML=`
        A
        <b style="font-style:bold">
            A
            <i style="font-style:italic">A</i>
        </b>
        <i style="font-style:italic">A</i>
    `

    const fontface=Array.from(document.fonts).find(a=>a.family==font.familyName)
    return fontface.loaded.then(font=>{
        document.dispatchEvent(new CustomEvent('fontLoaded',{detail:{font}}))
    })
}

const toName=a=>a.replace(/[\s]/g,'_')

export function removeFontFace(fontFace){
    if(!document?.createElement || !FontFace)
        return 
    
    if(fontFace.familyName){//maybe it's a font
        fontFace=Array.from(document.fonts)
            .reverse()
            .find(a=>{
                return a.family===fontFace.familyName 
                    && a.weight===(fontFace.bold ? "bold" : "normal") 
                    && a.style===(fontFace.italic ? "italic" : "normal")
            })
    }

    if(!fontFace)
        return 

    const names=[fontFace.family,`"${fontFace.family}"`]
    const rule=Array.from(fontFaces.sheet.rules).findIndex(a=>{
        if(names.includes(a.style.fontFamily)){
            return fontFace.style==(a.style.fontStyle||"normal") && fontFace.weight==(a.style.fontWeight||"normal")
        }
    })
    if(rule!=-1){
        fontFaces.sheet.deleteRule(rule)
        const allVariantFontsRemoved=!Array.from(fontFaces.sheet.rules).find(a=>names.includes(a.style.fontFamily))
        if(allVariantFontsRemoved){
            loader.querySelector('#'+toName(fontFace.family))?.remove()
        }
    }

    try{
        document.fonts.delete(fontFace)
    }catch(e){
        console.error(e)
    }
    console.debug(`font: removing fontface ${fontFace.family}`)
}