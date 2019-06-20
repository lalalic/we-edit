import {Input} from "we-edit"

import type from "./type"

export default class extends Input.EventReducer.xml{
    constructor(){
        super(...arguments)
        this.PR=""
        Object.assign(this,type)
    }

    getTagNameFromType(type){
        return type[0].toUpperCase()+type.substr(1)
    }

    create_first_paragraph(){
        const $body=this.file.$('Section').prepend(`<Paragraph><Text/></Paragraph>`)
        const a=this.file.renderChanged($body.children().first())
        this.$().findFirst('section').prepend(`#${a.id}`)
        this.cursorAt(a.id,0)
    }
}