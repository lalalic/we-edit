export default {
    forward_in_field(){
        const $field=this.$field
        const selector=`text[${$field.attr('showCode')?"":"!"}isInstr]`
        const begin=$field.forwardFirst(selector)
        const end=this.$fieldEnd.backwardFirst(selector)
        this.cursorAt(begin.attr('id'),0,end.attr('id'),end.attr('children').length,"end")
    },

    forward_at_end_in_field(){
        const end=this.$fieldEnd.forwardFirst(this.cursorable)
        if(end.length){
            this.cursorAt(end.attr('id'),0)
        }
    },
}