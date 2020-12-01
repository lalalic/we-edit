export default {
    backspace_at_end_of_br(){
        const r=this.target.closest('w\\:r')
        this.target.remove()
        this.file.renderChanged(r)
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

    backspace_at_end_of_image(){
        const rId=this.$target.closest('run').attr('id')
        this.cursorAt(rId,0, rId,1, undefined, false)
        this.remove()   
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
    backspace_at_beginning_of_up_to_run(){
        this.backspace_at_beginning(...arguments)
    },

    backspace_at_whole_in_field(){
        this.remove_at_whole_in_field(...arguments)
    },

    backspace_at_end_of_tab(){
        const r=this.target.closest('w\\:r')
        this.target.remove()
        this.file.renderChanged(r)
    }
}
