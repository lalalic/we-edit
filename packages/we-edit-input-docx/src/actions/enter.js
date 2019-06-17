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
    enter_at_beginning_of_text(e){
        this.enter_at_beginning(e)
    }

    //clone parent and hold target
    enter_at_beginning(e){
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
                this.insert(e)
            }
        }finally{
            this.cursorAt(cursor.id,cursor.at)
        }
    }

    enter_at_empty_paragraph(){
        this.enter_at_end_of_up_to_paragraph()
    }

    enter_at_beginning_of_up_to_paragraph(){
        const p=this.target.closest("w\\:p")
        const cloned=p.clone().insertBefore(p)
        cloned.children(`:not(${this.PR})`).remove()
        const a=this.file.renderChanged(cloned)

        const $p=this.$target.closest("paragraph")
        const $container=$p.parent()
        this.content.updateIn([$container.attr("id"),"children"],children=>{
            this.content.setIn([a.id,"parent"],$container.attr("id"))
            return children.insert(children.indexOf($p.attr('id')), a.id)
        })
    }

    enter_at_end_of_up_to_paragraph(){
        const p=this.target.closest("w\\:p")
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
    }
}
