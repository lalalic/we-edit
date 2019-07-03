export default {
    type_at_beginning_of_text_in_run(){
        this.type_at_text(...arguments)
    },

    type_at_empty_run(data){
        this.file.renderChanged(this.target.append(`<w:t>${data}</w:t>`))
        this.cursorAt(this.$target.children("text").attr("id"),data.length)
    },

    type_at_empty_paragraph(data){
        this.target.children(`:not(${this.PR})`).remove()
        this.$target.children().remove()
        this.file.renderChanged(this.target.append(`<w:r><w:t>${data}</w:t></w:r>`))
        this.cursorAt(this.$target.find("text").attr("id"),data.length)
    },

    //clone run to hold data
    type_at_beginning_of_run(data){
        const target=this.target
        const r=target.closest("w\\:r")
        const clonedR=r.clone()
        clonedR.children(":not(w\\:rPr)").remove()
        clonedR.append(`<w:t>${data}</w:t>`)
        r.before(clonedR)
        const a=this.file.renderChanged(clonedR)
        const $r=this.$target.closest("run")
        $r.before(`#${a.id}`)
        this.cursorAt(this.$(`#${a.id} text`).attr("id"),data.length)
    },

    //clone run to hold data
    type_at_beginning_of_up_to_run(){
        this.type_at_beginning_of_run(...arguments)
    },

    type_at_beginning_of_paragraph(data){
        this.file.renderChanged(this.target.afterOrPrepend(`<w:r><w:t>${data}</w:t></w:r>`,"w\\:pPr"))
        this.cursorAt(this.$target.find("text").first().attr("id"),data.length)
    },

    type_at_end_of_run(data){
        this.file.renderChanged(this.target.append(`<w:t>${data}</w:t>`))
        this.cursorAt(this.$target.children("text").last().attr("id"),data.length)
    },

    type_at_end_of_paragraph(data){
        this.file.renderChanged(this.target.append(`<w:r><w:t>${data}</w:t></w:r>`))
        this.cursorAt(this.$target.find("text").last().attr("id"),data.length)
    },
}
