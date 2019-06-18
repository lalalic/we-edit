export default {
    seperate_at_text_for_end(){
        const {id,at}=this.selection.start
        const target=this.target
        const src=target.text()
        
        target.text(src.substring(0,at))
        const cloned=target.clone()
            .text(src.substring(at))
            .insertAfter(target)
        
        this.file.renderChanged(this.file.getNode(this.$target.parent().attr("id")))

        this.cursorAtEnd(id)
    },

    seperate_at_text_for_start(){
        const {start:{id,at},end}=this.selection
        const target=this.target
        const src=target.text()
        
        target.text(src.substring(0,at))
        const cloned=target.clone()
            .text(src.substring(at))
            .insertAfter(target)
        const clonedId=this.file.makeId(cloned)
        this.file.renderChanged(this.file.getNode(this.$target.parent().attr("id")))

        if(end.id==id){
            end.id=clonedId
            end.at=src.length-at
        }
        this.cursorAt(clonedId,0,end.id,end.at)
    },   

    seperate_at_beginning_for_end(){
        const prevId=this.$target.backwardFirst().attr('id')
        if(prevId){
            this.cursorAtEnd(prevId)
        }
    },

    seperate_at_empty_for_end(){
        this.cursorAtEnd(this.selection.start.id)
    },

    seperate_at_empty_for_start(){
        const {start,end}=this.selection
        this.cursorAt(start.id,0,end.id,end.at)
    },

    seperate_at_end_for_start(){
        const {end}=this.selection
        const nextId=this.$target.forwardFirst().attr('id')
        if(nextId){
            this.cursorAt(nextId,0,end.id,end.at)
        }
    },

    seperate_up_to_paragraph_at_beginning(){
        const MARKER="_creating"
        const containers="w\\:r,w\\:sdt"
        const target=this.target.attr(MARKER,1)

        const p=target.closest("w\\:p")
        //update file
        const clonedP=p.clone()
        const clonedTarget=clonedP.find(`[${MARKER}=1]`)
        clonedTarget.parents(containers).each((i,el)=>{
            this.file.$(el).nextAll(`:not(${this.PR})`).remove()
        })
        clonedTarget.nextAll().add(clonedTarget).remove()
        
        p.before(clonedP)
        
        target.parents(containers).each((i,el)=>{
            this.file.$(el).prevAll(`:not(${this.PR})`).remove()
        })
        target.prevAll().remove()
        this.target.removeAttr(MARKER)

        //update state.content
        const a=this.file.renderChanged(clonedP)
        const $paragraph=this.$target.closest("paragraph")
        $paragraph.before('#'+a.id)

        this.file.renderChanged(p)

        this.cursorAt($paragraph.attr('id'),0)
    },

    seperate_up_to_run_at_end_of_text(){
        const target=this.target
        const r=target.closest('w\\:r')
        const clonedR=r.clone()
        clonedR.children(`:not(${this.PR})`).remove()
        clonedR.append(target.nextAll())
        r.after(clonedR)

        this.file.renderChanged(r)
        const a=this.file.renderChanged(clonedR)
        this.$target.closest("run").after(`#${a.id}`)
    },
}