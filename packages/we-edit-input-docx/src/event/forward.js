export default {
    forward_at_beginning_of_field(){
        const id=this.$target.attr('id')
        this.cursorAt(id,1)
    },

    forward_at_end_of_field(){
        const end=this.$target.forwardFirst(this.cursorable)
        if(end.length){
            this.cursorAt(end.attr('id'),0)
        }
    },

    forward_at_fieldBegin(){
        const id=this.$target.attr('id')
        this.cursorAt(`end${id}`,1)
    },

    forward_at_fieldEnd(){
        this.forward_at_end_of_field(...arguments)
    },

}