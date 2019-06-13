import Update from "./update"
import {Text,Paragraph,Image,Section,Table} from "../dom/edit"

export default class Create extends Update{
    create_table_at_text(){
        const {start:{id,at}}=this.selection
        const target=this.target.attr('pos','1')
        const text=target.text()
        const containers="w\\:r,w\\:sdt"
        try{
            const $=target.prototype.constructor
            const p=target.closest("w\\:p")

            const clonedP=p.clone()
            const clonedTarget=clonedP.find('[pos="1"]')
            clonedTarget.text(text.substring(0,at))
            clonedTarget.nextAll().remove()
            clonedTarget.parents(containers).forEach((i,el)=>{
                $(el).nextAll(`:not(${this.PR})`).remove()
            })

            p.before(clonedP)
            
            target.text(text.substring(at))
            target.prevAll().remove()
            target.parents(containers).forEach((i,el)=>{
                $(el).prevAll(`:not(${this.PR})`).remove()
            })

            const {id:clonedPId}=this.file.renderChanged(clonedP)
            const $paragraph=this.$target.closest("paragraph")
            const grandId=$paragraph.parent().attr('id')
            this.content.updateIn([grandId,"children"],children=>{
                return children.splice(children.indexOf(this.selection.start.id),0,clonedPId)
            })
            this.content.setIn([clonedPId,"parent"],grandId)

            this.file.renderChanged(p)
            this.cursorAt($paragraph.attr('id'),0)
            this.create_table_at_beginning_of_paragraph(...arguments)
        }finally{
            target.attr('pos',null)
        }
    }

    create_table_at_beginning_of_paragraph(element){
        const editor=new Table(this.file)
        editor.node=this.file.getNode(id)
        editor.create(element)
        
    }

    create_table_at_end_of_paragraph(){

    }

    create_image_at_text(){

    }
}