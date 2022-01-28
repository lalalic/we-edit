import {Text,Paragraph,Image,Section,Table,Shape,Field,TOC, Document} from "./dom"
import {dom} from "we-edit"
export default {
    update_at_text(props){
        const target=this.target
        const r=target.closest("w\\:r")
        const next=target.nextAll("w\\:t")
        const prev=target.prevAll("w\\:t")
        var structureChanged=false
        const cloneR=()=>{
            structureChanged=true
            const clonedR=r.clone()
            clonedR.children(":not(w\\:rPr)").remove()
            return clonedR
        }

        if(next.length>0){
            r.after(cloneR().append(target.nextAll()))
        }

        if(prev.length>0){
            r.before(cloneR().append(target.prevAll(":not(w\\:rPr)")))
        }

        if(structureChanged){
            this.file.renderChanged(this.file.getNode(this.$target.parent().parent().attr('id')))
        }

        const editor=new Text(this)
        editor.node=this.target
        editor.update(dom.Text.normalizeProps(props))
    },

    update_at_paragraph(props){
        const editor=new Paragraph(this)
        editor.node=this.target
        editor.update(dom.Paragraph.normalizeProps(props))
    },

    update_at_image(props){
        const editor=new Image(this)
        editor.node=this.target
        editor.update(props)
    },

    update_at_table(props){
        const editor=new Table(this)
        editor.node=this.target
        editor.update(props)
    },

    update_at_section(props){
        const editor=new Section(this)
        editor.node=this.target
        editor.update(props)
    },

    update_at_shape(props){
        const editor=new Shape(this)
        editor.node=this.target
        editor.update(props)
    },

    update_at_field(props){
        const editor=new Field.Simple(this)
        editor.node=this.target
        editor.update(props)
        this.file.renderChanged(this.target.closest('w\\:p'))
    },

    update_at_fieldBegin(props){
        const editor=new Field(this)
        editor.node=this.target
        editor.update(props)
        this.file.renderChanged(this.target.closest('w\\:p'))
    },

    update_at_fieldEnd(props){
        const editor=new Field(this)
        editor.node=this.target
        editor.update(props)
        this.file.renderChanged(this.target.closest('w\\:p'))
    },

    update_at_ToC(props){
        const editor=new TOC(this)
        editor.node=this.file.getNode('ToC')
        editor.update(props)
    },

    update_at_document(props){
        const editor=new Document(this)
        editor.update(props)
    }
}
