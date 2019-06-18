import {Text,Paragraph,Image,Section,Table} from "./dom"

export default {
    update_at_text({id,...changing}){
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
            r.before(cloneR().append(target.prevAll()))
        }

        if(structureChanged){
            this.file.renderChanged(this.file.getNode(this.$target.parent().parent().attr('id')))
        }

        const editor=new Text(this.file)
        editor.node=this.file.getNode(id)
        editor.update({id},changing)
    },

    update_at_paragraph({id, ...changing}){
        const editor=new Paragraph(this.file)
        editor.node=this.file.getNode(id)
        editor.update({id},changing)
    },

    update_at_image({id, ...changing}){
        const editor=new Image(this.file)
        editor.node=this.file.getNode(id)
        editor.update({id},changing)
    },

    update_at_table({id,  ...changing}){
        const editor=new Table(this.file)
        editor.node=this.file.getNode(id)
        editor.update({id},changing)
    },

    update_at_section({id, ...changing}){
        const editor=new Section(this.file)
        editor.node=this.file.getNode(id)
        editor.update({id},changing)
    },
}
