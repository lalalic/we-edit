import Backspace from "./backspace"
import {Text} from "../dom/edit"

export default class extends Backspace{
    update_at_text({id,type,...changing}){
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
    }

    
}
