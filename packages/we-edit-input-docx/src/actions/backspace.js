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

    backspace_at_beginning_of_text(){
        this.backspace_at_beginning(...arguments)
    }

    backspace_at_beginning(){
        const cursor=this.selection.start
        var current=this.$target, prevId
        while(current.length && !(prevId=current.prev().attr("id"))){
            current=current.parent()
        }
        if(!prevId){
            return
        }

        const $prev=this.$(`#${prevId}`)
        if($prev.attr("type")=="paragraph"){
            const prev=this.file.getNode(prevId)
            const $container=this.$target.closest("paragraph").parent()
            prev.append(this.target.closest("w\\:p").remove().children(`:not(${this.PR})`))
            this.file.renderChanged(prev)

            this.content.updateIn([$container.attr("id"),"children"],children=>{
                return children.remove(children.indexOf(prevId)+1)
            })
        }else{
            try{
                this.cursorAtEnd(prevId)
                this.remove(...arguments)
            }finally{
                this.cursorAt(cursor.id, cursor.at)
            }
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

    backspace_at_end_of_text(){
        const {start:{id,at}}=this.selection
        const target=this.target
        const src=target.text()
        target.text(src.substring(0,src.length-1))
        this.file.renderChanged(target)
        this.cursorAt(id,src.length-1)
    }

    backspace_at_empty_text(){
        const {id}=this.selection.start
        try{
            this.backspace_at_beginning_of_text(...arguments)
        }finally{
            this.file.getNode(id).remove()
            this.$('#'+id).remove()
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

    backspace_at_empty_paragraph(){
        const prev=this.$target.backwardFirst("paragraph")
        if(prev){
            try{
                this.backspace_at_beginning(...arguments)
            }finally{
                this.cursorAt(prev.attr('id'),1)
            }
        }
    }
}
