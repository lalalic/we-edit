import {Input} from "we-edit"

import type from "./type"
import backspace from "./backspace"

export default class extends Input.EventReducer.xml{
    constructor(){
        super(...arguments)
        this.PR=""
        this.PARAGRAPH="paragraph"
        this.TEXT="text"
        this.InlineContainers=""
        Object.assign(this,type, backspace)
    }

    create_first_paragraph(){
        const $body=this.file.$('section').prepend(`<paragraph><text/></paragraph>`)
        const a=this.file.renderChanged($body.children().first())
        this.$().findFirst('section').prepend(`#${a.id}`)
        this.cursorAt(a.id,0)
    }
}