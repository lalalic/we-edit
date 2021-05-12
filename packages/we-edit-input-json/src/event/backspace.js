export default {
    backspace_at_beginning_of_text(){
        this.backspace_at_beginning()
    },

    backspace_at_beginning_of_paragraph(){
        const target=this.target.closest('paragraph')
        if(target.attr('numbering')){
            const {level}=target.attr('numbering').toJS()
            if(level>0){
                const editor=this.createEditor('paragraph',target)
                editor.decNumbering()
            }else{
                target.attr('numbering',null)
            }
        }else{
            this.super.backspace_at_beginning_of_paragraph(...arguments)
        }
    }
}