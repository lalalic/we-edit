import Base from "../event"

import seperate from "./seperate"
import create from "./create"
import update from "./update"
import enter from "./enter"
import type from "./type"
import backspace from "./backspace"
import Delete from "./delete"
import tab from "./tab"
import forward from "./forward"
import backward from "./backward"
import remove from "./remove"

export default class __$1 extends Base{
    constructor(){
        super(...arguments)
        this.PR="__unknown"
        this.PARAGRAPH="paragraph"
        this.TEXT="text"
        this.InlineContainers=""
        Object.assign(this,seperate,create,update,enter,type,backspace,Delete,tab,forward,backward,remove)
    }

    get TEXT_(){
        return this.TEXT.replace(":","\\:")
    }

    get PARAGRAPH_(){
        return this.PARAGRAPH.replace(":","\\:")
    }

    merge_in_paragraph(){
        const {start,end}=this.selection
        this.cursorAt(start.id, start.at)
    }

    merge_up_to_same_grand_parent(){
        const {start,end}=this.selection
        const p0=this.target.closest(this.PARAGRAPH_)
        const p1=this.file.getNode(end.id).closest(this.PARAGRAPH_)
        p0.append(p1.children(`:not(${this.PR})`))
        this.$(`#${end.id}`).remove()
        p1.remove()
        this.file.renderChanged(p0)
        this.cursorAt(start.id, start.at)
    }

    create_first_paragraph(){
        throw new Error("create_first_paragraph")
    }
}