import Update from "./update"
import {Text,Paragraph,Image,Section,Table} from "./dom"

export default class Create extends Update{
    create_table_at_text(props){
        this.seperate_at_text_for_end()
        this.create(props)
    }

    create_table_at_beginning_of_text(props){
        this.create_table_at_beginning(props)
    }

    create_table_at_end_of_text(props){
        this.create_table_at_end(props)
    }

    create_table_at_end(props){
        const next=this.$target.forwardFirst()
        if(next.length>0 && next.attr('type')!='paragraph'){
            this.cursorAt(next.attr('id'),0)
        }
        this.create(props) 
    }
      
    create_table_at_beginning(props){
        this.seperate_up_to_paragraph_at_beginning()
        this.create(props)
    }

    create_table_at_beginning_of_up_to_paragraph(props){
        this.cursorAt(this.$target.closest("paragraph").attr('id'),0)
        this.create(props)
    }

    create_table_at_end_of_up_to_paragraph(props){
        this.cursorAt(this.$target.closest("paragraph").attr('id'),1)
        this.create(props)
    }

    create_table_at_end_of_up_to_document(props){
        const p=this.target.closest("w\\:p")
        const clonedP=p.clone()
        clonedP.children(`:not(${this.PR})`).remove()
        clonedP.append(`<w:r><w:t/></w:r>`)
        p.after(clonedP)
        const a=this.file.renderChanged(clonedP)
        this.$target.closest("paragraph").after('#'+a.id)
        this.create(props)
    }

    create_table_at_beginning_of_paragraph(props){
        const editor=new Table(this.file)
        editor.create(props)
        this.target.before(editor.node)
        const {id}=this.file.renderChanged(editor.node)
        this.$target.before('#'+id)
        this.cursorAt(this.$('#'+id).first("text").attr('id'),0)
    }

    create_table_at_end_of_paragraph(props){
        const editor=new Table(this.file)
        editor.create(props)
        this.target.after(editor.node)
        const {id}=this.file.renderChanged(editor.node)
        this.$target.after('#'+id)
        this.cursorAt(this.$('#'+id).first("text").attr('id'),0)
    }

    create_table_at_empty_paragraph(){
        this.create_table_at_beginning_of_paragraph(...arguments)
    }

    create_image_at_text(){
        //split text to run
        this.seperate_at_text_for_end()
        this.seperate_up_to_run_at_end_of_text()
        this.cursorAt(this.$target.parent().attr('id'),1)
        this.create(...arguments)
    }

    create_image_at_beginning_of_up_to_run(){
        this.cursorAt(this.$target.closest('run').attr('id'),0)
        this.create(...arguments)
    }

    create_image_at_end_of_up_to_run(){
        this.cursorAt(this.$target.closest('run').attr('id'),1)
        this.create(...arguments)
    }

    create_image_at_beginning_of_run(props){
        const editor=new Image(this.file)
        editor.create(props)
        this.target.before(`<w:r/>`)
        const r=this.target.prev()
        r.append(editor.node)
        const {id}=this.file.renderChanged(r)
        this.$target.before('#'+id)
        this.cursorAt(this.$('#'+id).first().attr('id'),0)
    }

    create_image_at_end_of_run(props){
        const editor=new Image(this.file)
        editor.create(props)
        this.target.after(`<w:r/>`)
        const r=this.target.next()
        r.append(editor.node)
        const {id}=this.file.renderChanged(r)
        this.$target.after('#'+id)
        this.cursorAt(this.$('#'+id).first().attr('id'),0)
    }

    create_image_at_empty_run(props){
        const editor=new Image(this.file)
        editor.create(props)
        const r=this.target
        r.append(editor.node)
        const {id}=this.file.renderChanged(r)
        this.$target.after('#'+id)
        this.cursorAt(this.$('#'+id).first().attr('id'),0)
    }

    create_image_at_empty_paragraph(){
        this.target.append(`<w:r/>`)
        this.file.renderChanged(this.target)
        this.cursorAt(this.$target.children("run").attr('id'),0)
        this.create(...arguments)
    }
}