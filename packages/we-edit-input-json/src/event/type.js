export default {
    type_at_text({data}){
        const target=this.target
        const {start:{id,at}}=this.selection
        const src=target.text()
        target.text(src.substring(0,at)+data+src.substring(at))
        this.file.renderChanged(target)
        this.cursorAt(id,at+data.length)
    }
}