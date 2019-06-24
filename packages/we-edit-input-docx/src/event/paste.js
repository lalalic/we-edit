export default {
    paste_run_at_text(){
        this.seperate_at_text_for_end()
        this.seperate_up_to_run_at_end_of_text()
        this.paste_run_at_end_of_run(...arguments)
    },

    paste_run_at_end_of_run($pasting,pasting){
        this.$target.closest("run").after($pasting)
        this.target.closest("w\\:r").after(pasting)
        this.cursorAtEnd($pasting.attr('id'))
    },

    paste_run_at_empty_paragraph($pasting,pasting){
        this.$target.append($pasting)
        this.target.append(pasting)
        this.cursorAtEnd($pasting.attr('id'))
    }
}