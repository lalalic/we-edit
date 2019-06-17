import Update from "./update"
import {Text,Paragraph,Image,Section,Table} from "../dom/edit"

export default class Create extends Update{
    create_table_at_text(props){
        const {start:{id,at}}=this.selection
        const target=this.target
        const text=target.text()
        const clonedTarget=target.clone()
        clonedTarget.text(text.substring(0,at))
        target.text(text.substring(at))
        target.before(clonedTarget)
        const a=this.file.renderChanged(clonedTarget)
        this.$target.before('#'+a.id)
        this.cursorAt(id,0)
        this.create(props)
    }

    create_table_at_beginning_of_text(props){
        this.create_table_at_beginning(props)
    }

    create_table_at_end_of_text(props){
        this.create_table_at_end(props)
    }

    create_table_at_end(props){
        const $target=this.$target
        const next=$target.next()
        if(next.length>0){
            this.cursorAt(next.attr('id'),0)
        }else{
            const $parent=$target.parent()
            if($parent.length>0 && $parent.attr('type')!="paragraph"){
                this.cursorAt($parent.attr('id'),1)
            }
        }
        this.create(props) 
    }
    
    
    create_table_at_beginning(props){
        const MARKER="_creating"
        const containers="w\\:r,w\\:sdt"
        const target=this.target.attr(MARKER,1)

        const p=target.closest("w\\:p")
        //update file
        const clonedP=p.clone()
        const clonedTarget=clonedP.find('[_creating=1]')
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

    create_image_at_text(){
        //split text to run
        const {start:{at}}=this.selection
        const target=this.target
        const text=target.text()
        target.after(target.clone().text(text.substring(at)))
        target.text(text.substring(0,at))

        const r=target.closest('w\\:r')
        const clonedR=r.clone()
        clonedR.children(`:not(${this.PR})`).remove()
        clonedR.append(target.nextAll())
        r.after(clonedR)

        this.file.renderChanged(r)
        const a=this.file.renderChanged(clonedR)
        this.$target.closest("run").after(`#${a.id}`)
        this.cursorAt(this.$target.parent().attr('id'),1)
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
}