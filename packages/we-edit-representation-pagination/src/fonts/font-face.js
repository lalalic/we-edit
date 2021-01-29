
var fontFaces=null, loader=null
export function makeFontFace(font, src){
    if(!document?.createElement)
        return 
    if(!fontFaces){
        loader=document.body.appendChild(document.createElement('div'))
        fontFaces=loader.appendChild(document.createElement("style"))
        fontFaces.id="we_edit_web_fonts"
    }
    if(typeof(font)=="string")
        return fontFaces.sheet.addRule('@font-face',font)
        
    fontFaces.sheet.addRule('@font-face',`
        font-family:"${font.familyName}";
        src: ${src};
        ${font.bold ? 'font-weight:bold;' : ''}
        ${font.italic ? 'font-style:italic;' : ''}
        ${font.oblique ? 'font-style:oblique;' : ''}
    `)
    const span=loader.appendChild(document.createElement('span'))
    span.id=toName(font.familyName)
    span.style.fontFamily=font.familyName
    span.textContent=" "
}

const toName=a=>a.replace(/\s/g,'_')

export function removeFontFace(family){
    const rule=Array.from(fontFaces.sheet.rules).findIndex(a=>a.style['font-family']==family)
    if(rule!=-1){
        fontFaces.sheet.deleteRule(rule)
        loader.querySelector('#'+toName(family))?.remove()
    }
}