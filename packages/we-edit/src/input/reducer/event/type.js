export default {
    type_at_text(data){
        const target=this.target
        const {id,at}=this.cursor
        const src=target.text()
        target.text(src.substring(0,at)+data+src.substring(at))
        this.file.renderChanged(target)
        this.cursorAt(id,at+data.length)
    },

    type_at_empty_text(data){
        this.file.renderChanged(this.target.text(data))
        this.cursorAt(this.cursor.id,data.length)
    },
}
