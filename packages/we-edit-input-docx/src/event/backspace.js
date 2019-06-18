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
        const $prev=this.$target.backwardFirst()
        if($prev.length){
            this.cursorAtEnd($prev.attr('id'))
            this.remove(...arguments)
        }
    },

    backspace_at_beginning_of_up_to_run(){
        this.backspace_at_beginning(...arguments)
    },

    backspace_at_beginning_of_up_to_paragraph(){
        const $p=this.$target.closest("paragraph")
        const pPr=this.target.closest(`w\\:p`).children("w\\:pPr")  
        if($p.attr('numId')){
            this.backspace_at_beginning_of_up_to_numbering_paragraph()
        }else if(pPr.find("w\\:ind").length>0){
            this.backspace_at_beginning_of_up_to_indent_paragraph()
        }else{
            const $prevP=$p.backwardFirst("table, paragraph")
            if($prevP.attr('type')=="paragraph"){
                const prevId=$prevP.attr('id')
                const prev=this.file.getNode(prevId)
                const $container=$p.parent()
                prev.append(this.target.closest("w\\:p").remove().children(`:not(${this.PR})`))
                this.file.renderChanged(prev)

                this.content.updateIn([$container.attr("id"),"children"],children=>{
                    return children.remove(children.indexOf(prevId)+1)
                })
                this.cursorAtEnd(prevId)
            }
        }
    },

    backspace_at_beginning_of_up_to_numbering_paragraph(){
        const p=this.target.closest(`w\\:p`)
        const pPr=p.children("w\\:pPr")  
        const numPr=pPr.find("w\\:numPr")
        if(numPr.length>0){
            numPr.remove()
            this.file.renderChanged(p)
        }else if(this.file.doc.officeDocument
            .styles(`w\\:style[w\\:styleId="${pPr.find('w\\:pStyle').attr("w:val")}"]`)
            .basest(":has(w\\:numPr,w\\:ind)")
            .length>0){
            pPr.find('w\\:pStyle').remove()
            this.file.renderChanged(p)
        }else{
            console.error('should not be here')
        }    
    },

    backspace_at_beginning_of_up_to_indent_paragraph(){
        const p=this.target.closest(`w\\:p`)
        const ind=p.children("w\\:pPr").find("w\\:ind")  
        if(parseInt(ind.attr("w:hanging")||0)>0 || 
            parseInt(ind.attr("w:firstLine")||0)>0){
            ind.attr("w:hanging","0")
            ind.attr("w:firstLine","0")
        }else{
            ind.remove()
        }
        this.file.renderChanged(p)
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
            this.remove(...arguments)
        }finally{
            this.cursorAt(cursor.id, cursor.at)
        }
    },

    backspace_at_end(){
        const cursor=this.selection.start
        const last=this.$target.children().last().attr("id")
        if(last){
            this.cursorAtEnd(last)
            this.remove(...arguments)
        }else{
            this.cursorAt(cursor.id,0, cursor.id,1, undefined, false)
            this.removeSelection() 
        }
    },

    backspace_at_end_of_image(){
        const rId=this.$target.closest('run').attr('id')
        this.cursorAt(rId,0, rId,1, undefined, false)
        this.removeSelection()   
    },

    backspace_at_empty(){
        this.backspace_at_beginning(...arguments)
    },

    backspace_at_empty_run(){
        const {id}=this.selection.start
        try{
            this.backspace_at_empty(...arguments)
        }finally{
            this.file.getNode(id).remove()
            this.$('#'+id).remove()
        }
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
        const pPr=this.target.closest(`w\\:p`).children("w\\:pPr")  
        if($p.attr('numId')){
            this.backspace_at_beginning_of_up_to_numbering_paragraph(...arguments)
        }else if(pPr.find("w\\:ind").length>0){
            this.backspace_at_beginning_of_up_to_indent_paragraph(...arguments)
        }
    },
}
