export default {
    tab_at_beginning_of_up_to_paragraph(e){
        this.update_at_paragraph({id:this.$target.closest("paragraph").attr('id'),tab:e})
    },

    tab_at_text(){
        this.seperate_at_text_for_end()
        this.seperate_up_to_run_at_end_of_text()
        const r=this.target.closest('w\\:r')
        const rTab=this.file.$(`<w:r><w:tab/></w:r>`)
        r.after(rTab)
        const a=this.file.renderChanged(rTab)
        this.$target.closest('run').after(`#${a.id}`)
        this.cursorAt(a.id,1)
    },
}