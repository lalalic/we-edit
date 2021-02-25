
var fontFaces=null, loader=null
export function makeFontFace(font, src){
    if(!document?.createElement)
        return 
    if(!fontFaces){
        loader=document.body.appendChild(document.createElement('div'))
        loader.id='we_edit_font_loader'
        fontFaces=loader.appendChild(document.createElement("style"))
        fontFaces.id="we_edit_font_face"
    }
    if(typeof(font)=="string")
        return fontFaces.sheet.addRule('@font-face',font)
    if(!src){
        const nativeFont=new FontFace(font.familyName, font.stream.buffer, {})
        document.fonts.add(nativeFont)
    }else{
        fontFaces.sheet.addRule('@font-face',`
            font-family:"${font.familyName}";
            src: ${src};
            ${font.bold ? 'font-weight:bold;' : ''}
            ${font.italic ? 'font-style:italic;' : ''}
            ${font.oblique ? 'font-style:oblique;' : ''}
        `)
    }
    
    const id=toName(font.familyName)
    if(loader.querySelector(`#${id}`))
        return 
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
}

const toName=a=>a.replace(/\s/g,'_')

export function removeFontFace(font){
    const names=[font.family,`"${font.family}"`]
    const rule=Array.from(fontFaces.sheet.rules).findIndex(a=>{
        if(names.includes(a.style.fontFamily)){
            return font.style==(a.style.fontStyle||"normal") && font.weight==(a.style.fontWeight||"normal")
        }
    })
    if(rule!=-1){
        fontFaces.sheet.deleteRule(rule)
        const allVariantFontsRemoved=!Array.from(fontFaces.sheet.rules).find(a=>names.includes(a.style.fontFamily))
        if(allVariantFontsRemoved){
            loader.querySelector('#'+toName(font.family))?.remove()
        }
    }
}