import {Input} from "we-edit"

import seperate from "./seperate"
import create from "./create"
import update from "./update"
import enter from "./enter"
import type from "./type"
import backspace from "./backspace"
import tab from "./tab"

export default class Actions extends Input.EventReducer{
    constructor(){
        super(...arguments)
        this.debug=true
        this.PR="w\\:rPr,w\\:pPr,w\\:tblPr,w\\:sdtPr,w\\:tcPr,w\\:trPr"
        Object.assign(this,seperate,create,update,enter,type,backspace,tab)
    }

    remove_whole(){
        const $target=this.$target
        const $prev=$target.backwardFirst()
        const $next=$target.forwardFirst()
        
        $target.remove()
        this.target.remove()

        if($prev.length>0){
            this.cursorAtEnd($prev.attr("id"))
        }else if($next.length>0){
            this.cursorAt($next.attr('id'),0)
        }else{
            this.create_first_paragraph()
        }
    }

    remove_whole_at_beginning_of_up_to_paragraph(){
        const $p=this.$target.closest("paragraph")
        this.remove_whole()
        this.cursorAt($p.attr('id'),0)
    }

    shrink_text(){
        const {start:{id, at:at0}, end:{at:at1}}=this.selection
        const start=Math.min(at0,at1), end=Math.max(at0,at1)
        const target=this.target
        const src=target.text()
        target.text(src.substring(0,start)+src.substring(end))
        this.file.renderChanged(this.file.getNode(id))
        this.cursorAt(id,start)
    }

    merge_in_paragraph(){
        const {start,end}=this.selection
        this.cursorAt(start.id, start.at)
    }

    merge_up_to_same_grand_parent(){
        const {start,end}=this.selection
        const p0=this.target.closest("w\\:p")
        const p1=this.file.getNode(end.id).closest("w\\:p")
        p0.append(p1.children(`:not(${this.PR})`))
        this.$(`#${end.id}`).remove()
        p1.remove()
        this.file.renderChanged(p0)
        this.cursorAt(start.id, start.at)
    }

    create_first_paragraph(){
        const $body=this.file.$('w\\:body').prepend(`<w:p><w:r><w:t/></w:r></w:p>`)
        const a=this.file.renderChanged($body.children().first())
        this.$().findFirst('section').prepend(`#${a.id}`)
        this.cursorAt(a.id,0)
    }
}