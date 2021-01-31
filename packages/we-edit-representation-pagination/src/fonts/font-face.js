
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
        
    fontFaces.sheet.addRule('@font-face',`
        font-family:"${font.familyName}";
        src: ${src};
        ${font.bold ? 'font-weight:bold;' : ''}
        ${font.italic ? 'font-style:italic;' : ''}
        ${font.oblique ? 'font-style:oblique;' : ''}
    `)
    
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

export function removeFontFace(family){
    const names=[family,`"${family}"`]
    const rule=Array.from(fontFaces.sheet.rules).findIndex(a=>names.includes(a.style.fontFamily))
    if(rule!=-1){
        fontFaces.sheet.deleteRule(rule)
        loader.querySelector('#'+toName(family))?.remove()
    }
}