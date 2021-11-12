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
        this.safeCursor(()=>{
            this.$target.remove()
            this.target.remove()
        })
    },

    remove_at_whole_paragraph_up_to_document(){
        this.$target.remove()
        this.target.remove()
        this.create_first_paragraph()
    },

    remove_at_beginning_of_up_to_paragraph(){
        const $p=this.$target.closest("paragraph")
        this.remove_at_whole()
        this.cursorAt($p.attr('id'),0)
    },

    remove_cell(){

    },

    remove_column(){
        
    },

    remove_row(){
        const $row=this.$target.closest("row")
        if($row.length>0){
            const $table=$row.closest('table')
            if($table.find("row").length==1){
                this.remove_table()
            }else{
                this.selectWhole($row.attr('id'))
                this.remove_at_whole()
            }
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