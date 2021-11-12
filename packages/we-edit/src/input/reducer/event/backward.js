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
                this.cursorAt(backward.attr('id'),0)
            }
        }
    },

    backward_at_end(){
        this.cursorAt(this.$target.attr('id'),0)
    },

    backward_at_beginning_of_up_to_paragraph(){
        const prevP=this.$target.closest("paragraph").backwardFirst("paragraph")
        this.cursorAt(prevP.attr('id'),1)
    },

    backward_at_beginning_of_up_to_document(){

    },

    backward_at_end_of_paragraph(){
        const $last=this.$target.findLast(this.cursorable)
        if($last.attr('type')=="text"){
            this.cursorAt($last.attr('id'),$last.text().length-1)
        }else{
            this.cursorAt($last.attr('id'),0)
        }
    }
}