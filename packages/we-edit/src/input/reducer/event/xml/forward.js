export default {
    forward_at_text(){
        const {start:{id,at}}=this.selection
        this.cursorAt(id,at+1)
        if(at==this.$target.text().length-1){
            this.forward(...arguments)    
        }
    },

    forward_at_end_of_text(){
        this.forward_at_end()
    },

    forward_at_end(){
        const forward=this.$target.forwardFirst()
        this.cursorAt(forward.attr('id'),0)
        this.forward(...arguments)
    },

    forward_at_end_of_text_up_to_document(){

    },

    forward_at_empty(){
        this.forward_at_end()
    },

    forward_at_beginning(){
        const first=this.$target.children().first()
        this.cursorAt(first.attr('id'),0)
    }
}