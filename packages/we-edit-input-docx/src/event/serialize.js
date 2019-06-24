export default {
    serialize_at_text(){
        const {start,end}=this.selection
        const text=this.$target.text()
        const cloned=this.file.getNode(this.$target.closest("run").attr('id')).clone()
        cloned.find("w\\:t").remove()
        cloned.append(`<w:t>${text.substring(start.at, end.at)}</w:t>`)
        return this.file.serialize(cloned)
    },

    serialize_any(){
        return this.file.serialize(this.$target.attr('id'))
    }
}