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
        const prevId=this.$target.backwardFirst().attr('id')
        if(prevId){
            this.cursorAtEnd(prevId)
        }
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
        const nextId=this.$target.forwardFirst().attr('id')
        if(nextId){
            this.cursorAt(nextId,0,end.id,end.at)
        }
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

    merge_in_paragraph(){
        const {start,end}=this.selection
        this.cursorAt(start.id, start.at)
    }

    merge_up_to_same_grand_parent(){
        const {start,end}=this.selection
        const p0=this.target.closest("w\\:p")
        const p1=this.file.getNode(end.id).closest("w\\:p")
        p0.append(p1.children(`:not(${this.PR})`))
        this.$(`#${end.id}`).remove()
        p1.remove()
        this.file.renderChanged(p0)
        this.cursorAt(start.id, start.at)
    }

    create_first_paragraph(){
        this.file.$('w\\:body').prepend(`<w:p><w:r><w:t/></w:r></w:p>`)
        const a=this.file.renderChanged(this.file.$('w\\:p'))
        this.$().findFirst('section').append(`#${a.id}`)
        this.cursorAt(a.id,0)
    }
}
