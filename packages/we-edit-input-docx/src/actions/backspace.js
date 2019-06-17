import Enter from "./enter"

export default class Backspace extends Enter{
    backspace_at_text(){
        const {start:{id,at}}=this.selection
        const target=this.target
        const src=target.text()
        target.text(src.substring(0,at-1)+src.substring(at))
        this.file.renderChanged(target)
        this.cursorAt(id,at-1)
    }

    backspace_at_beginning_of_up_to_paragraph(){
        const $p=this.$target.closest("paragraph")
        const $prevP=$p.backwardFirst("table, paragraph")
        if($prevP.attr('type')=="paragraph"){
            const prevId=$prevP.attr('id')
            const prev=this.file.getNode(prevId)
            const $container=$p.parent()
            prev.append(this.target.closest("w\\:p").remove().children(`:not(${this.PR})`))
            this.file.renderChanged(prev)

            this.content.updateIn([$container.attr("id"),"children"],children=>{
                return children.remove(children.indexOf(prevId)+1)
            })
        }
    }
    
    backspace_at_beginning(){
        const cursor=this.selection.start
        const $prev=this.$target.backwardFirst()
        if($prev.length==0){
            return
        }

        const prevId=$prev.attr('id')
        try{
            this.cursorAtEnd(prevId)
            this.remove(...arguments)
        }finally{
            this.cursorAt(cursor.id, cursor.at)
        }
    }

    backspace_at_end(){
        const cursor=this.selection.start
        try{
            this.cursorAtEnd(this.$target.children().last().attr("id"))
            this.remove(...arguments)
        }finally{
            this.cursorAt(cursor.id, cursor.at)
        }
    }

    backspace_at_empty(){
        this.backspace_at_beginning(...arguments)
    }

    backspace_at_empty_run(){
        const {id}=this.selection.start
        try{
            this.backspace_at_empty(...arguments)
        }finally{
            this.file.getNode(id).remove()
            this.$('#'+id).remove()
        }
    }

    backspace_at_empty_up_to_paragraph(){
        this.backspace_at_empty_paragraph()
    }

    backspace_at_empty_paragraph(){
        const prev=this.$target.backwardFirst("table,paragraph")
        if(prev.attr('type')=="paragraph"){
            this.$target.remove()
            this.target.remove()
            this.cursorAt(prev.attr('id'),1)
        }
    }
    
    backspace_at_empty_up_to_document(){

    }

    backspace_at_beginning_of_up_to_document(){
        
    }    

    backspace_at_empty_up_to_cell(){

    }

    backspace_at_beginning_of_up_to_cell(){
       
    }
}
