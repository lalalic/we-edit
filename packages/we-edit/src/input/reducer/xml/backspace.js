export default {
    backspace_at_text(){
        const {start:{id,at}}=this.selection
        const target=this.target
        const src=target.text()
        target.text(src.substring(0,at-1)+src.substring(at))
        this.file.renderChanged(target)
        this.cursorAt(id,at-1)
    },

    backspace_at_empty_text(){
        const $prev=this.$target.backwardFirst(this.cursorable)
        if($prev.length){
            this.cursorAtEnd($prev.attr('id'))
            this.backspace(...arguments)
        }
    },

    paragraphHasIndentSetting(){
        throw new Error("paragraphHasIndentSetting implementation")
    },

    backspace_at_beginning_of_up_to_paragraph(){
        const $p=this.$target.closest("paragraph")
        if($p.attr('numId')){
            this.backspace_at_beginning_of_up_to_numbering_paragraph()
        }else if(this.paragraphHasIndentSetting()){
            this.backspace_at_beginning_of_up_to_indent_paragraph()
        }else{
            const $prevP=$p.backwardFirst("table, paragraph")
            if($prevP.attr('type')=="paragraph"){
                const prevId=$prevP.attr('id')
                const prev=this.file.getNode(prevId)
                const $container=$p.parent()
                prev.append(this.target.closest(this.PARAGRAPH_).remove().children(`:not(${this.PR})`))
                this.file.renderChanged(prev)

                this.content.updateIn([$container.attr("id"),"children"],children=>{
                    return children.remove(children.indexOf(prevId)+1)
                })
                this.cursorAtEnd(prevId)
            }
        }
    },
    
    backspace_at_beginning(){
        const cursor=this.selection.start
        const $prev=this.$target.backwardFirst(this.cursorable)
        if($prev.length==0){
            return
        }

        const prevId=$prev.attr('id')
        try{
            this.cursorAtEnd(prevId)
            this.backspace(...arguments)
        }finally{
            this.cursorAt(cursor.id, cursor.at)
        }
    },

    backspace_at_end(){
        debugger
        const cursor=this.selection.start
        const last=this.$target.findLast(this.cursorable)
        if(last.length>0){
            this.cursorAtEnd(last.attr('id'))
            this.backspace(...arguments)
        }else{
            this.cursorAt(cursor.id,0, cursor.id,1, undefined, false)
            this.removeSelection() 
        }
    },

    backspace_at_empty(){
        this.backspace_at_beginning(...arguments)
    },

    backspace_at_empty_up_to_paragraph(){
        this.backspace_at_empty_paragraph(...arguments)
    },

    backspace_at_empty_paragraph(){
        this.backspace_at_beginning_of_up_to_document(...arguments)
    },
    
    backspace_at_empty_up_to_document(){
        this.backspace_at_beginning_of_up_to_document(...arguments)
    },

    backspace_at_beginning_of_up_to_document(){
        this.backspace_at_beginning_of_up_to_paragraph(...arguments)
    }, 

    backspace_at_empty_up_to_cell(){
        this.backspace_at_beginning_of_up_to_cell(...arguments)
    },

    backspace_at_beginning_of_up_to_cell(){
        const $p=this.$target.closest("paragraph")
        if($p.attr('numId')){
            this.backspace_at_beginning_of_up_to_numbering_paragraph(...arguments)
        }else if(this.paragraphHasIndentSetting()){
            this.backspace_at_beginning_of_up_to_indent_paragraph(...arguments)
        }
    },
}
