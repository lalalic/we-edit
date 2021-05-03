import Editor from "./base"
import {dom} from "we-edit"

export default class Paragraph extends Editor{
    numbering(numbering){
        if(!numbering){
            this.node.attr('numbering',null)
            return 
        }
        if(numbering.id){//change props
            this.reducer.updateNumberingStyle(numbering)
        }else{//create
            const prevNonEmptyParagraph=this.getPrevNonEmptyParagraph(this.node)
            if(prevNonEmptyParagraph.length){
                const prevNumbering=this.reducer.getNumbering(prevNonEmptyParagraph.attr('numbering').toJS())
                if(dom.Paragraph.NumberingShape.meet(prevNumbering,numbering)){
                    this.node.attr("numbering",{id:prevNumbering.id,level:prevNumbering.levle})
                    return 
                }
            }

            this.node.attr("numbering",this.reducer.createNumbering(numbering))
        }
    }

    decNumbering(){
        const {id,level=0, ...numbering}=this.node.attr('numbering').toJS()
        this.node.attr('numbering',{...numbering,id, level:level-1})
    }

    incNumbering(){
        const {id,level=0, ...numbering}=this.node.attr('numbering').toJS()
        this.reducer.updateNumbering({id,level:level+1})
        this.node.attr('numbering',{...numbering,id, level:level+1})
    }

    getPrevNonEmptyParagraph(){
        const siblings=this.node.closest('frame,section,cell').find("paragraph",{nested:false})
        const i=siblings.indexOf(this.node)
        const id=siblings.toArray().slice(0,i).findLast(a=>!this.$('#'+a).isEmpty())
        return siblings.filter(a=>a==id)
    }
}