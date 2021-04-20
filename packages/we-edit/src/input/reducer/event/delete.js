export default {
    delete_at_text(){
        const {start:{id,at}}=this.selection
        const target=this.target
        const src=target.text()
        target.text(src.substring(0,at)+src.substring(at+1))
        this.file.renderChanged(target)
    },

    delete_at_end_of_text(){
        this.delete_at_end(...arguments)
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
        const $nextP=$p.forwardFirst("table,paragraph")
        if($nextP.attr('type')=="paragraph"){debugger
            const p=this.file.getNode($p.attr('id'))
            const nextP=this.file.getNode($nextP.attr('id'))
            p.append(nextP.children().not(this.PR))
            nextP.remove()
            $nextP.remove()
            
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

    delete_at_beginning(){
        const {start:{id}}=this.selection
        this.cursorAt(id,0,id,1)
        this.remove()
    },

}