import {Input} from "we-edit"

export default class extends Input.EventReducer{
    get targetFileNode(){
        const {id}=this.selection.start
        return this.file.getNode(id)
    }

    text_at_text({data}){
        const target=this.targetFileNode
        const {start:{id,at}}=this.selection
        const src=target.text()
        target.text(src.substring(0,at)+data+src.substring(at))
        this.file.renderChanged(target)
        this.cursorAt(id,at+data.length)
    }

    text_at_empty_text({data}){
        this.file.renderChanged(this.targetFileNode.text(data))
        this.cursorAt(this.selection.start.id,data.length)
    }

    text_at_empty_run({data}){
        this.file.renderChanged(this.targetFileNode.append(`<w:t>${data}</w:t>`))
        this.cursorAt(this.target.children("text").attr("id"),data.length)
    }

    text_at_empty_paragraph({data}){
        this.file.renderChanged(this.targetFileNode.append(`<w:r><w:t>${data}</w:t></w:r>`))
        this.cursorAt(this.target.find("text").attr("id"),data.length)
    }

    text_at_beginning_of_run({data}){
        this.file.renderChanged(this.targetFileNode.afterOrPrepend(`<w:t>${data}</w:t>`,"w\\:rPr"))
        this.cursorAt(this.target.children("text").first().attr("id"),data.length)
    }

    text_at_beginning_of_paragraph(){
        this.file.renderChanged(this.targetFileNode.afterOrPrepend(`<w:r><w:t>${data}</w:t></w:r>`,"w\\:pPr"))
        this.cursorAt(this.target.find("text").first().attr("id"),data.length)
    }

    text_at_end_of_run({data}){
        this.file.renderChanged(this.targetFileNode.append(`<w:t>${data}</w:t>`))
        this.cursorAt(this.target.children("text").last().attr("id"),data.length)
    }

    text_at_end_of_paragraph(){
        this.file.renderChanged(this.targetFileNode.append(`<w:r><w:t>${data}</w:t></w:r>`))
        this.cursorAt(this.target.find("text").last().attr("id"),data.length)
    }

    text_at_beginning_of_any_in_run(){
        
    }

    text_at_end_of_any_in_run(){

    }


    enter_at_text(){
        const {at}=this.selection.start
        const target=this.targetFileNode
        const src=target.text()
        const next=target.clone()
        target.text(src.substring(0,at))
        next.text(src.substring(at)).insertAfter(target)
        this.file.renderChanged(target.parent())
        const $next=this.target.next()
        this.cursorAt($next.attr("id"),0)
        try{
            this.insert(...arguments)
        }finally{
            this.cursorAt($next.attr("id"),0)
        }
    }

    enter_at_beginning_of_text(){

    }

    enter_at_end_of_text(){

    }

    enter_at_run(){

    }

    enter_at_beginning_of(){
        const target=this.targetFileNode
        const parent=target.parent()
        const pending=parent.clone().empty()
            .append(target.nextAll())
            .prepend(target)
            .insertAfter(target)

        const p1=this.file.renderChanged(nextP)
        const p0=this.file.renderChanged(target.closest("w\\:p"))
        this.content.updateIn([this.content.getIn([p0.id,"parent"]),"children"],children=>{
            return children.insert(children.indexOf(p0.id)+1, p1.id)
        })
    }

    enter_at_beginning_of_text(){
        const target=this.targetFileNode
        const r=target.closest("w\\:r")
        const r1=r.clone()
        r1.children(":not(w\\:rPr)").remove()
        r1.append(target).insertAfter(r)
        const parentOfRun=this.file.getNode(this.target.closest("run").parent().attr("id"))
        this.file.renderChanged(parentOfRun)
        const cursorId=this.target.parent().next().attr("id")
        this.cursorAt(cursorId,0)
        try{
            this.insert(...arguments)
        }finally{
            this.cursorAt(cursorId,0)
        }
    }

    enter_at_beginning_of_paragraph(){

    }
}
