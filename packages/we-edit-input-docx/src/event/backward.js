export default {
    backward_at_beginning_of_field(){
        const prev=this.$target.backwardFirst(this.cursorable)
        if(prev.length){
            this.cursorAtEnd(prev.attr('id'))
        }
    },

    backward_at_end_of_field(){
        this.cursorAt(this.$target.attr('id'),0)
    },

    backward_at_fieldBegin(){
        this.backward_at_beginning_of_field(...arguments)
    },

    backward_at_fieldEnd(){
        const id=this.$target.attr('id')
        this.cursorAt(id.substring(3),0)
    }
}