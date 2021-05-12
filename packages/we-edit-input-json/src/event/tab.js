export default {
    tab_at_beginning_of_paragraph(){
        const target=this.target.closest('paragraph')
        if(target.attr('numbering')){
            const editor=this.createEditor('paragraph',target)
            editor.incNumbering()
        }
    },

    tab_at_beginning_of_up_to_paragraph(){
        this.tab_at_beginning_of_paragraph()
    }
}