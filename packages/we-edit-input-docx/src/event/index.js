import {Input} from "we-edit"

import seperate from "./seperate"
import create from "./create"
import update from "./update"
import enter from "./enter"
import type from "./type"
import backspace from "./backspace"
import tab from "./tab"

export default class Actions extends Input.EventReducer.xml{
    constructor(){
        super(...arguments)
        this.debug=true
        this.PR="w\\:rPr,w\\:pPr,w\\:tblPr,w\\:sdtPr,w\\:tcPr,w\\:trPr"
        this.PARAGRAPH="w:p"
        this.TEXT="w:t"
        this.InlineContainers="w\\:r, w\\:sdt"
        
        Object.assign(this,seperate,create,update,enter,type,backspace,tab)
    }

    create_first_paragraph(){
        const $body=this.file.$('w\\:body').prepend(`<w:p><w:r><w:t/></w:r></w:p>`)
        const a=this.file.renderChanged($body.children().first())
        this.$().findFirst('section').prepend(`#${a.id}`)
        this.cursorAt(a.id,0)
    }
}