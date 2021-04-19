export default {
    merge_in_paragraph(){
        const {start,end}=this.selection
        this.cursorAt(start.id, start.at)
    },

    merge_up_to_same_grand_parent(){
        const {start,end}=this.selection
        const p0=this.target.closest(this.PARAGRAPH_)
        const p1=this.file.getNode(end.id).closest(this.PARAGRAPH_)
        p0.append(p1.children().not(this.PR))
        this.$(`#${end.id}`).remove()
        p1.remove()
        this.file.renderChanged(p0)
        this.cursorAt(start.id, start.at)
    }
}