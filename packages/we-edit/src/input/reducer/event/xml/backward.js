export default {
    backward_at_text(){
        const {start:{id,at}}=this.selection
        this.cursorAt(id, at-1)
    },

    backward_at_beginning_of_text(){
        this.backward_at_beginning()
    },

    backward_at_beginning(){
        const backward=this.$target.backwardFirst()
        this.cursorAt(backward.attr('id'),1)
    },

    backward_at_empty(){
        this.backward_at_beginning()
    }    
}