export default {
    backward_in_field(){
        const backward=this.$field.backwardFirst(this.cursorable)
        if(backward.length>0){
            this.cursorAt(backward.attr('id'),backward.attr('children').length-1)
        }
    }
}