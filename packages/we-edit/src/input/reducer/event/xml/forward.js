export default {
    forward_at_text(){
        const {start:{id,at}}=this.selection
        if(at==this.$target.text().length-1){
            this.forward_at_end_of_text()       
        }else{
            this.cursorAt(id,at+1)
        }
    },

    forward_at_end_of_text(){
        this.forward_at_end()
    },

    forward_at_end(){
        const forward=this.$target.forwardFirst(this.cursorable)
        if(forward.length>0){
            this.cursorAt(forward.attr('id'),0)
        }
    },

    forward_at_end_of_text_up_to_document(){

    },

    forward_at_empty(){
        this.forward_at_end()
    },

    forward_at_beginning(){
        this.forward_at_end()    
    }
}