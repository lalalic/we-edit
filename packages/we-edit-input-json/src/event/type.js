import React from "react"

export default {
    type_at_empty_paragraph(data){
        const a=this.file.renderChanged(<text>{data}</text>)
        this.target.append('#'+a.id)
        this.cursorAt(a.id,data.length)
    }
}