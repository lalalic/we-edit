import {Text,Paragraph,Image,Section,Table,Shape,Field} from "./dom"

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

        const editor=new Text(this.file)
        editor.node=this.target
        editor.update(props)
    },

    update_at_paragraph(props){
        const editor=new Paragraph(this.file)
        editor.node=this.target
        editor.update(props)
    },

    update_at_image(props){
        const editor=new Image(this.file)
        editor.node=this.target
        editor.update(props)
    },

    update_at_table(props){
        const editor=new Table(this.file)
        editor.node=this.target
        editor.update(props)
    },

    update_at_section(props){
        const editor=new Section(this.file)
        editor.node=this.target
        editor.update(props)
    },

    update_at_shape(props){
        const editor=new Shape(this.file)
        editor.node=this.target
        editor.update(props)
    },

    update_at_fieldBegin({toggle, ...props}){
        const $target=this.$target
        if(toggle){//UI only
            const showCode=!!!$target.attr('showCode')
            $target.attr('showCode',showCode)
            const first=this.$('#'+toggle).forwardFirst(a=>{
                if(a.getIn(['props','field'])===toggle && (!!a.getIn(['props','isInstr']))===showCode)
                    return true
            })  
            this.cursorAt(first.attr('id'),0)
            this.cursorAt=()=>void(0)//@@Hack: cursor can't be changed after this
        }else{
            const editor=new Field(this.file)
            editor.node=this.target
            editor.content=$target
            editor.doc=this
            editor.update(props)
            this.file.renderChanged(this.target.closest('w\\:p'))
        }
    }
}
