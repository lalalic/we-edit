export default {
    forward_at_text(){
        const {start:{id,at}}=this.selection
        this.cursorAt(id,at+1)
    },

    forward_at_end_of_text(){
        this.forward_at_end()
    },

    forward_at_end_of_paragraph_up_to_document(){
        
    },

    forward_at_end(){
        const forward=this.$target.forwardFirst(this.cursorable)
        if(forward.length>0){
            this.cursorAt(forward.attr('id'),1)
        }
    },

    forward_at_empty(){
        this.forward_at_end()
    },

    forward_at_beginning(){
        this.cursorAtEnd(this.selection.start.id)
        this.forward()    
    },

    forward_at_beginning_of_paragraph(){
        const first=this.$target.findFirst(this.cursorable)
        if(first.length>0){
            this.cursorAt(first.attr('id'),0)
            this.forward()
        }else{
            this.forward_at_end()
        }
    }
}