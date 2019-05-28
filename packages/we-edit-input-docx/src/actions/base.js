import {Input} from "we-edit"

export default class extends Input.EventReducer{
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
    }

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
    }    

    seperate_at_beginning_for_end(){
        var current=this.$target, prevId
        while(current.length && !(prevId=current.prev().attr("id"))){
            current=current.parent()
        }
        if(!prevId){
            return
        }
        this.cursorAtEnd(prevId)
    }

    seperate_at_empty_for_end(){
        this.cursorAtEnd(this.selection.start.id)
    }

    seperate_at_empty_for_start(){
        const {start,end}=this.selection
        this.cursorAt(start.id,0,end.id,end.at)
    }

    seperate_at_end_for_start(){
        const {end}=this.selection
        var current=this.$target, nextId
        while(current.length && !(nextId=current.next().attr("id"))){
            current=current.parent()
        }
        if(!nextId){
            return
        }
        this.cursorAt(nextId,0,end.id,end.at)
    }

    remove_whole(){
        this.$target.remove()
        this.target.remove()
    }

    shrink_text(){
        const {start:{id, at:at0}, end:{at:at1}}=this.selection
        const start=Math.min(at0,at1), end=Math.max(at0,at1)
        const target=this.target
        const src=target.text()
        target.text(src.substring(0,start)+src.substring(end))
        this.file.renderChanged(this.file.getNode(id))
        this.cursorAt(id,start)
    }

    merge_up_to_same_grand_parent(){
        const {start,end}=this.selection
        const grandParent=this.$target.closest(this.$('#'+end.id).parents())
        const parentOfStart=this.$target.parentsUntil(grandParent).last()
        const parentOfEnd=this.$('#'+end.id).parentsUntil(grandParent).last()
        const nodeOfEnd=this.file.getNode(parentOfEnd.attr('id'))
        const nodeOfStart=this.file.getNode(parentOfStart.attr("id"))
        nodeOfStart.append(nodeOfEnd.contents())
        parentOfEnd.remove()
        this.file.renderChanged(nodeOfStart)
        this.cursorAt(start.id, start.at)
    }
}
