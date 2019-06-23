export default {
    delete_at_text(){
        const {start:{id,at}}=this.selection
        const target=this.target
        const src=target.text()
        if(at==src.length-1){
            this.forward()
        }        
        target.text(src.substring(0,at)+src.substring(at+1))
        this.file.renderChanged(target)
    },

    delete_at_end_of_text_up_to_paragraph(){
        this.delete_at_end_of_text_up_to_paragraph(...arguments)
    },

    delete_at_end_of_text_up_to_paragraph(){
        const $p=this.$target.closest("paragraph")
        this.delete_at_text(...arguments)
        this.cursorAt($p.attr('id'),1)
    },

    delete_at_empty_text(){
        this.delete_at_end(...arguments)
    },

    delete_at_end(){
        const $next=this.$target.forwardFirst(this.cursorable)
        if($next.length>0){
            this.cursorAt($next.attr('id'),0)
            this.delete(...arguments)
        }
    },

    delete_at_end_of_paragraph(){
        this.delete_at_end_of_up_to_paragraph(...arguments)
    },

    delete_at_end_of_up_to_paragraph(){
        const $p=this.$target.closest("paragraph")
        const $next=$p.forwardFirst("table,paragraph")
        if($next.attr('type')=="paragraph"){
            const p=this.file.getNode($p.attr('id'))
            const nextP=this.file.getNode($next.attr('id'))
            p.append(nextP.children(`:not(${this.PR})`))
            $next.remove()
            this.file.renderChanged(p)

        }
    },

    delete_at_end_of_up_to_document(){

    },

    delete_at_empty_up_to_paragraph(){
        const $p=this.$target.closest('paragraph')
        const $prev=$p.backwardFirst("paragraph")
        $p.remove()
        this.file.getNode($p.attr('id')).remove()
        this.cursorAt($prev.attr('id'),1)
    },

    delete_at_empty_paragraph(){
        this.delete_at_empty_up_to_paragraph(...arguments)
    },

    delete_at_empty_up_to_document(){

    },

}