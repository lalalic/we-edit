export default {
    //the result should be [element], or [el1,...,el2]
	seperateSelection(){
        const action="seperate"
        var {start,end}=this.selection
        start={...start}, end={...end}
        if(start.id==end.id){
            start.at=Math.min(start.at, end.at)
            end.at=Math.max(start.at, end.at)
            //whole
            if(this.content.getIn([start.id,"type"])!="text")
                return
            //text
            //full text, whole/empty
            const isEndAtEnd=end.at>=this.content.getIn([start.id,"children"]).length-1
            if(start.at==0 && isEndAtEnd)
                return
            if(start.at==end.at){
                this.emit("split_text",this.conds)
                return
            }
        }else{
            //normalize start, and end according to order
            const ids=[start.id,end.id]
            const grand=this.$('#'+end.id).parentsUntil(this.$('#'+start.id).parents()).parent()
            grand.findFirst(a=>{
                switch(ids.indexOf(a.get('id'))){
                    case 1:
                        ([start,end]=[end,start]);
                    case 0:
                        return true
                }
            })
        }

        this.cursorAt(end.id, end.at)
        var conds=this.conds
        if(!(conds.includes("at_end"))){
            this.emit(action,conds.map(a=>a+"_for_end"))
        }
        end=this.selection.start

        this.cursorAt(start.id,start.at,end.id,end.at)
        conds=this.conds
        if(conds.includes("at_whole")){
            return 
        }

        if(!(conds.includes("at_beginning"))){
            this.emit(action,this.conds.map(a=>a+"_for_start"))
        }
    },

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

    split_text_at_text(){
        this.seperate_at_text_for_start()
        this.split_text_at_beginning()
    },

    split_text_at_end(){
        const target=this.target
        const empty=target.clone().text("").insertAfter(target)
        this.file.renderChanged(this.file.getNode(this.$target.parent().attr("id")))
        this.cursorAt(this.file.makeId(empty),0)
    },

    split_text_at_beginning(){
        const target=this.target
        const empty=target.clone().text("").insertBefore(target)
        this.file.renderChanged(this.file.getNode(this.$target.parent().attr("id")))
        this.cursorAt(this.file.makeId(empty),0)
    },

    seperate_at_beginning_for_end(){
        const prevId=this.$target.backwardFirst(this.cursorable).attr('id')
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
        const containers=this.InlineContainers
        const target=this.target.attr(MARKER,1)

        const p=target.closest(this.PARAGRAPH_)
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
}