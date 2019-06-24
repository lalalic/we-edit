export default {
    paste_text_at_text($pasting){
        this.seperate_at_text()
        this.seperate_up_to_run_at_end_of_text()
    },

    paste_run_at_text($pasting){
        const $r=this.$target.closest("run")
        this.file.getNode($r.attr('id')).after('#'+$pasting.attr('id'))
        $r.after($pasting)
    }
}