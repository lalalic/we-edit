import Type from "./type"

export default class Enter extends Type{
    enter_at_text(){
        const {at}=this.selection.start
        const target=this.target
        const src=target.text()
        const next=target.clone()
        target.text(src.substring(0,at))
        next.text(src.substring(at)).insertAfter(target)
        this.file.renderChanged(target.parent())
        const $next=this.$target.next()
        this.cursorAt($next.attr("id"),0)
        try{
            this.insert(...arguments)
        }finally{
            this.cursorAt($next.attr("id"),0)
        }
    }

    //cons: may left empty r
    //can't remove it, otherwise dead loop
    enter_at_beginning_of_text(){
        this.enter_at_beginning_of_up_to_paragraph(...arguments)
    }

    enter_at_beginning_of_in_paragraph(){
        this.enter_at_beginning_of_up_to_paragraph(...arguments)
    }

    //clone parent and hold target
    enter_at_beginning_of_up_to_paragraph(payload,conds){
        const cursor=this.selection.start
        const target=this.target
        const $parent=this.$target.parent()
        const parent=this.file.getNode($parent.attr("id"))
        const cloned=parent.clone().insertAfter(parent)
        cloned.children(`:not(${this.PR})`).remove()

        cloned.append(target.nextAll())
        cloned.afterOrPrepend(target,this.PR)

        const clonedId=this.file.makeId(cloned)
        this.file.renderChanged(parent)
        this.file.renderChanged(cloned)

        const $container=$parent.parent()

        this.content.updateIn([$container.attr("id"),"children"],children=>{
            this.content.setIn([clonedId,"parent"],$container.attr("id"))
            return children.insert(children.indexOf($parent.attr("id"))+1, clonedId)
        })
        try{
            if($parent.attr('type')!="paragraph"){
                this.cursorAt(clonedId,0)
                this.insert(...arguments)
            }
        }finally{
            this.cursorAt(cursor.id,cursor.at)
        }
    }

    enter_at_empty_paragraph(){
        const cloned=this.target.clone().insertAfter(this.target)
        const clonedId=this.file.makeId(cloned)
        this.file.renderChanged(cloned)

        const $container=this.$target.parent()
        this.content.updateIn([$container.attr("id"),"children"],children=>{
            this.content.setIn([clonedId,"parent"],$container.attr("id"))
            return children.insert(children.indexOf(this.selection.start.id)+1, clonedId)
        })
        this.cursorAt(clonedId,0)
    }

    enter_at_empty_run(){
        this.enter_at_end_of_up_to_paragraph(...arguments)
    }

    enter_at_end_of_text(){
        this.enter_at_end_of_up_to_paragraph(...arguments)
    }

    enter_at_beginning_of_paragraph(){
        const cloned=this.target.clone().insertBefore(this.target)
        cloned.children(`:not(${this.PR})`).remove()
        const clonedId=this.file.makeId(cloned)
        this.file.renderChanged(cloned)

        const $container=this.$target.parent()
        this.content.updateIn([$container.attr("id"),"children"],children=>{
            this.content.setIn([clonedId,"parent"],$container.attr("id"))
            return children.insert(children.indexOf(this.selection.start.id), clonedId)
        })
    }

    enter_at_end_of_paragraph(){
        const cloned=this.target.clone().insertAfter(this.target)
        cloned.children(`:not(${this.PR})`).remove()
        const clonedId=this.file.makeId(cloned)
        this.file.renderChanged(cloned)

        const $container=this.$target.parent()
        this.content.updateIn([$container.attr("id"),"children"],children=>{
            this.content.setIn([clonedId,"parent"],$container.attr("id"))
            return children.insert(children.indexOf(this.selection.start.id)+1, clonedId)
        })

        this.cursorAt(clonedId,0)
    }

    enter_at_end_of_up_to_paragraph(){
        const cursor=this.selection.start
        const target=this.target
        const $parent=this.$target.parent()
        const parent=this.file.getNode($parent.attr("id"))
        const cloned=parent.clone().insertAfter(parent)
        cloned.children(`:not(${this.PR})`).remove()

        cloned.append(target.nextAll())

        const clonedId=this.file.makeId(cloned)
        this.file.renderChanged(parent)
        this.file.renderChanged(cloned)

        const $container=$parent.parent()

        this.content.updateIn([$container.attr("id"),"children"],children=>{
            this.content.setIn([clonedId,"parent"],$container.attr("id"))
            return children.insert(children.indexOf($parent.attr("id"))+1, clonedId)
        })

        try{
            if($parent.attr('type')!="paragraph"){
                this.cursorAt(clonedId,0)
                this.insert(...arguments)
            }
        }finally{
            this.cursorAt(clonedId,0)
        }
    }
}
