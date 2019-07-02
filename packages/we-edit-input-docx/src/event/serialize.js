export default {
    serialize_at_text(){
        const {start,end}=this.selection
        const text=this.$target.text()
        const cloned=this.file.getNode(this.$target.closest("run").attr('id')).clone()
        cloned.find("w\\:t").remove()
        cloned.append(`<w:t>${text.substring(start.at, end.at)}</w:t>`)
        return this.file.serialize(cloned)
    },

    serialize_at_whole_text(){
        if(this.$target.parent().children().length==1){
            this.extend("run")
            return this.emit("serialize", this.conds)
        }
        const text=this.$target.text()
        const cloned=this.file.getNode(this.$target.closest("run").attr('id')).clone()
        cloned.find("w\\:t").remove()
        cloned.append(`<w:t>${text}</w:t>`)
        return this.file.serialize(cloned)
    },

    serialize_at_whole(){
        return this.file.serialize(this.$target.attr('id'))
    }
}