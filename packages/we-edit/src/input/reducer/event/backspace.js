export default {
    backspace_at_text(){
        const {start:{id,at}}=this.selection
        const target=this.target
        const src=target.text()
        target.text(src.substring(0,at-1)+src.substring(at))
        this.file.renderChanged(target)
        this.cursorAt(id,at-1)
    },

    backspace_at_beginning_of_text(){
        this.backspace_at_beginning()
    },

    backspace_at_beginning_of_paragraph(){debugger
        this.backspace_at_beginning_of_up_to_paragraph()
    },

    backspace_at_beginning_of_up_to_paragraph(){
        if(this.isNumberingParagraph()){
            this.backspace_at_beginning_of_up_to_numbering_paragraph()
        }else if(this.paragraphHasIndentSetting()){
            this.backspace_at_beginning_of_up_to_indent_paragraph()
        }else{
            const $p=this.$target.closest("paragraph")
            const $prevP=$p.backwardFirst("table, paragraph")
            if($prevP.attr('type')=="paragraph"){
                const prevP=this.file.getNode($prevP.attr('id'))
                const p=this.target.closest(this.PARAGRAPH_)
                
                const last=$prevP.children().length-1
                //append paragraph's content to prev paragraph in file
                prevP.append(p.children().not(this.PR))
                p.remove()
                $p.remove()
                
                this.file.renderChanged(prevP)
                //sync state content
                const $cursor=$prevP.children().eq(last+1)
                if($cursor.length){
                    this.cursorAt($cursor.attr('id'),0)
                }else{
                    this.cursorAtEnd($prevP.attr('id'))
                }
            }
        }
    },
    
    backspace_at_beginning(){
        const cursor=this.selection.start
        const $prev=this.$target.backwardFirst()
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
        const cursor=this.selection.start
        const last=this.$target.findLast(this.cursorable)
        if(last.length>0){
            this.cursorAtEnd(last.attr('id'))
            this.backspace(...arguments)
        }else{
            this.cursorAt(cursor.id,0, cursor.id,1)
            this.remove() 
        }
    },

    backspace_at_beginning_of_up_to_document(){
        this.backspace_at_beginning_of_up_to_paragraph(...arguments)
    }, 

    backspace_at_beginning_of_up_to_cell(){
        if(this.isNumberingParagraph()){
            this.backspace_at_beginning_of_up_to_numbering_paragraph(...arguments)
        }else if(this.paragraphHasIndentSetting()){
            this.backspace_at_beginning_of_up_to_indent_paragraph(...arguments)
        }
    },
}
