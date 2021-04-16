export default {
    enter_at_text(){
        this.seperate_at_text_for_end()
        const $next=this.$target.forwardFirst()
        this.cursorAt($next.attr("id"),0)
        try{
            this.enter()
        }finally{
            this.cursorAt($next.attr("id"),0)
        }
    },

    //cons: may left empty r
    //can't remove it, otherwise dead loop
    enter_at_beginning_of_text(){
        if(this.$target.prev().length==0){
            this.cursorAt(this.$target.parent().attr('id'),0)
            this.enter()
        }else{
            this.enter_at_beginning()
        }
    },

    enter_at_empty_text(){
        this.enter_at_beginning()
    },

    enter_at_empty_up_to_cell(){
        this.enter_at_beginning_of_up_to_table()
    },

    enter_at_beginning_of_table(){
        this.enter_at_beginning_of_up_to_table()
    },

    enter_at_beginning_of_up_to_table(){
        const $container=this.$target.closest("table,paragraph")
        if($container.backwardFirst("paragraph").length==0){
            this.create_first_paragraph()
        }else{
            this.enter_at_beginning()
        }
    },

    //clone parent and hold target
    enter_at_beginning(){
        this.seperate_up_to_paragraph_at_beginning()
    },

    enter_at_empty_paragraph(){
        this.enter_at_empty_up_to_paragraph()
    },

    enter_at_empty_up_to_paragraph(){
        this.enter_at_end_of_up_to_paragraph()
    },

    enter_at_beginning_of_paragraph(){
        this.enter_at_beginning_of_up_to_paragraph()
    },
    
    enter_at_beginning_of_up_to_paragraph(){
        const p=this.target.closest(this.PARAGRAPH_)
        const cloned=p.clone().insertBefore(p)
        cloned.children(`:not(${this.PR})`).remove()
        const a=this.file.renderChanged(cloned)

        const $p=this.$target.closest("paragraph")
        const $container=$p.parent()
        this.content.updateIn([$container.attr("id"),"children"],children=>{
            this.content.setIn([a.id,"parent"],$container.attr("id"))
            return children.insert(children.indexOf($p.attr('id')), a.id)
        })
    },

    enter_at_end(){
        const next=this.$target.forwardFirst()
        if(next.closest("paragraph").is(this.$target.closest("paragraph"))){
            this.cursorAt(next.attr('id'),0)
            this.enter()
        }
    },

    enter_at_end_of_paragraph(){
        this.enter_at_end_of_up_to_paragraph()
    },

    enter_at_end_of_up_to_paragraph(){
        const p=this.target.closest(this.PARAGRAPH_)
        const cloned=p.clone().insertAfter(p)
        cloned.children(`:not(${this.PR})`).remove()
        const a=this.file.renderChanged(cloned)

        const $p=this.$target.closest("paragraph")
        const $container=$p.parent()
        this.content.updateIn([$container.attr("id"),"children"],children=>{
            this.content.setIn([a.id,"parent"],$container.attr("id"))
            return children.insert(children.indexOf($p.attr('id'))+1, a.id)
        })

        this.cursorAt(a.id,0)
    },
}
