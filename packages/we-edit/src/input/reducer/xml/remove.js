export default {
    remove_at_text(){
        const {start:{id, at:at0}, end:{at:at1}}=this.selection
        const start=Math.min(at0,at1), end=Math.max(at0,at1)
        const target=this.target
        const src=target.text()
        target.text(src.substring(0,start)+src.substring(end))
        this.file.renderChanged(this.file.getNode(id))
        this.cursorAt(id,start)
    },

    remove_at_whole_text(){
        this.remove_at_whole(...arguments)
    },

    remove_at_whole(){
        const $target=this.$target
        const $prev=$target.backwardFirst(this.cursorable)
        const $next=$target.forwardFirst(this.cursorable)
        
        $target.remove()
        this.target.remove()

        if($prev.length>0){
            this.cursorAtEnd($prev.attr("id"))
        }else if($next.length>0){
            this.cursorAt($next.attr('id'),0)
        }else{
            this.create_first_paragraph()
        }
    },

    remove_at_beginning_of_up_to_paragraph(){
        const $p=this.$target.closest("paragraph")
        this.remove_whole()
        this.cursorAt($p.attr('id'),0)
    },

    remove_row(){
        const cell=this.$target.closest("cell")
        if(row.length>0){
            this.selectWhole(cell.attr('id'))
            this.remove_at_whole()
        }
    },

    remove_row(){
        const row=this.$target.closest("row")
        if(row.length>0){
            this.selectWhole(row.attr('id'))
            this.remove_at_whole()
        }
    },

    remove_table(){
        const table=this.$target.closest("table")
        if(table.length>0){
            this.selectWhole(table.attr('id'))
            this.remove_at_whole()
        }
    }
}