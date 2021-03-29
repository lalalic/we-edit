import JSZip from 'jszip'
import {ReactQuery} from "we-edit"

export function parseFile(data){
    const raw=new JSZip(data),parts={}
	raw.filter((path,file)=>parts[path]=file)
    return parts
}

export function anchor(p0, positioning){
    const page=positioning.pages.find(({props:{I,height,Y=positioning.pageXY(I).y}})=>p0.y>Y && p0.y<Y+height)
    const $=new ReactQuery(page.createComposed2Parent())
    
    const {id=$.findFirst('[data-type="paragraph"]').attr('data-content')}=positioning.around(p0.x,p0.y)
    const paragraph=positioning.getContent(id).closest("paragraph").attr('id')

    const {first, parents}=$.findFirstAndParents(`[data-content="${paragraph}"]`)
    const y0=[...parents,first.get(0)].filter(a=>!!a).reduce((Y,{props:{y=0}})=>Y+y,positioning.pageXY(page.props.I).y)
    const l=first.attr('pagination').i

    const line=page.lines.find(({props:{pagination:{i,id}}})=>id==paragraph && i==l)
    const {column=page.columnIndexOf(line), cols, x0=cols[column].x}=page
    
    const run=l>1 ? first.findFirst('[data-type="run"]').attr('data-content') : undefined
    return {
        offset:{x:p0.x-x0,y:p0.y-y0},
        paragraph, 
        run 
    }
}