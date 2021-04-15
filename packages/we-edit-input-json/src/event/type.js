export default {
    type_at_text(data){
        const text=this.$target.text()
        const {at,id}=this.cursor
        this.$target.text(text.substring(0,at)+data+text.substring(at))
        this.cursorAt(id,at+data.length)
    }
}