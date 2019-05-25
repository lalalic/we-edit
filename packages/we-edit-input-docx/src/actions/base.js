import {Input} from "we-edit"

export default class extends Input.EventReducer{
    seperate_at_text_for_end(){
        const {id,at}=this.selection.start
        const target=this.target
        const src=target.text()
        
        target.text(src.substring(0,at))
        const cloned=target.clone().text(src.substring(at))
        
        this.file.renderChanged(this.file.getNode(this.$target.parent().attr("id")))

        this.cursorAtEnd(id)
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

    seperate_at_text_for_start(){
        const {id,at}=this.selection.start
        const target=this.target
        const src=target.text()
        
        target.text(src.substring(0,at))
        const cloned=target.clone().text(src.substring(at))
        const clonedId=this.file.makeId(cloned)
        this.file.renderChanged(this.file.getNode(this.$target.parent().attr("id")))

        this.cursorAt(clonedId,0)
    }

    seperate_at_empty_for_start(){
        this.cursorAtEnd(this.selection.start.id,0)
    }

    seperate_at_end_for_start(){
        var current=this.$target, nextId
        while(current.length && !(nextId=current.next().attr("id"))){
            current=current.parent()
        }
        if(!nextId){
            return
        }
        this.cursorAt(nextId,0)
    }

    remove_whole(){

    }

    remove_whole_text(){

    }

    shrink_text(){

    }
}
