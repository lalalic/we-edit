export default {
    backward_at_text(){
        const {start:{id,at}}=this.selection
        this.cursorAt(id, at-1)
    },

    backward_at_beginning_of_text(){
        this.backward_at_beginning()
    },

    backward_at_beginning(){
        const backward=this.$target.backwardFirst(this.cursorable)
        if(backward.length>0){
            switch(backward.attr('type')){
            case "text":
                return this.cursorAt(backward.attr('id'), backward.text().length-1)
            default: 
                this.cursorAtEnd(backward.attr('id'))
                this.backward(...arguments)
            }
        }
    },

    backward_at_empty(){
        this.backward_at_beginning()
    },  
    
    backward_at_end(){
        this.cursorAt(this.$target.attr('id'),0)
    },
}