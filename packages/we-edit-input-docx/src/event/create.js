import {Image,Section,Table} from "./dom"

export default{
    create_table_at_end_of_up_to_document(){
        const p=this.target.closest("w\\:p")
        const clonedP=p.clone()
        clonedP.children(`:not(${this.PR})`).remove()
        clonedP.append(`<w:r><w:t/></w:r>`)
        p.after(clonedP)
        const a=this.file.renderChanged(clonedP)
        this.$target.closest("paragraph").after('#'+a.id)
        this.create(...arguments)
    },

    create_table_at_beginning_of_paragraph(){
        const editor=new Table(this.file)
        editor.create(...arguments)
        this.target.before(editor.node)
        const {id}=this.file.renderChanged(editor.node)
        this.$target.before('#'+id)
        this.cursorAt(this.$('#'+id).first("text").attr('id'),0)
    },

    create_table_at_end_of_paragraph(){
        const editor=new Table(this.file)
        editor.create(...arguments)
        this.target.after(editor.node)
        const {id}=this.file.renderChanged(editor.node)
        this.$target.after('#'+id)
        this.cursorAt(this.$('#'+id).first("text").attr('id'),0)
    },

    
    create_image_at_text(){
        //split text to run
        this.seperate_at_text_for_end()
        this.seperate_up_to_run_at_end_of_text()
        this.cursorAt(this.$target.parent().attr('id'),1)
        this.create(...arguments)
    },

    create_image_at_beginning_of_up_to_run(){
        this.cursorAt(this.$target.closest('run').attr('id'),0)
        this.create(...arguments)
    },

    create_image_at_end_of_up_to_run(){
        this.cursorAt(this.$target.closest('run').attr('id'),1)
        this.create(...arguments)
    },

    create_image_at_beginning_of_run(){
        const editor=new Image(this.file)
        editor.create(...arguments)
        this.target.before(`<w:r/>`)
        const r=this.target.prev()
        r.append(editor.node)
        const {id}=this.file.renderChanged(r)
        this.$target.before('#'+id)
        this.cursorAt(this.$('#'+id).first().attr('id'),0)
    },

    create_image_at_end_of_run(){
        const editor=new Image(this.file)
        editor.create(...arguments)
        this.target.after(`<w:r/>`)
        const r=this.target.next()
        r.append(editor.node)
        const {id}=this.file.renderChanged(r)
        this.$target.after('#'+id)
        this.cursorAt(this.$('#'+id).first().attr('id'),0)
    },

    create_image_at_empty_run(){
        const editor=new Image(this.file)
        editor.create(...arguments)
        const r=this.target
        r.append(editor.node)
        const {id}=this.file.renderChanged(r)
        this.$target.after('#'+id)
        this.cursorAt(this.$('#'+id).first().attr('id'),0)
    },

    create_image_at_empty_paragraph(){
        this.target.append(`<w:r/>`)
        this.file.renderChanged(this.target)
        this.cursorAt(this.$target.children("run").attr('id'),0)
        this.create(...arguments)
    },
}