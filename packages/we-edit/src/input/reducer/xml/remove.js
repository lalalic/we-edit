export default {
    remove({type}={}){
        if(type){
            this.emit("remove", [...this.conds,""].map(a=>type.toLowerCase()+(a&&'_')+a), ...arguments)
            return this
        }

        const {start,end}=this.selection
        if(start.id==end.id){
            if(start.at!==end.at){
                this.emit("remove", this.conds, ...arguments)
            }
            return this
        }

        try{
            this.seperateSelection()
            const {start,end}=this.selection
            const prev=this.$("#"+start.id).backwardFirst(this.cursorable)
            const next=this.$('#'+end.id).forwardFirst(this.cursorable)

            const targets=this.$target.to("#"+end.id)
            targets.toArray().forEach(id=>{
                this.selectWhole(id)
                this.emit("remove",this.conds, ...arguments)
            })

            //join
            if(prev.length==0 && next.length==0){
                this.create_first_paragraph()
                return 
            }else{
                 if(prev.length>0){
                    this.cursorAtEnd(prev.attr("id"))
                    if(next.length>0){
                        this.cursorAt(this.selection.start.id, this.selection.start.at, next.attr("id"),0)

                        const {end}=this.selection
                        const parentsOfEnd=this.$('#'+end.id).parents()
                        const grandParent=this.$target.closest(parentsOfEnd)
                        const inParagraph=parentsOfEnd.slice(0,parentsOfEnd.indexOf(grandParent)+1).filter("paragraph").length>0
        
                        const type=grandParent.attr("type")
                        const conds=[]
                        if(inParagraph){
                            conds.push("in_paragraph")
                        }
                        conds.push(`up_to_${type}`)
                        conds.push("up_to_same_grand_parent")
                        this.emit("merge",conds)
                    }
                }else if(next.length>0){
                    this.cursorAt(next.attr("id"),0)
                }
            }
        }finally{
            if(this.content.has(start.id)){
                this.cursorAt(start.id, start.at)
            }
        }
        return this
    },
       
    remove_at_text(){
        const {start:{id, at:at0}, end:{at:at1}}=this.selection
        const start=Math.min(at0,at1), end=Math.max(at0,at1)
        const target=this.target
        const src=target.text()
        target.text(src.substring(0,start)+src.substring(end))
        this.file.renderChanged(this.file.getNode(id))
        this.cursorAt(id,start)
    },

    remove_at_whole_text(){
        this.remove_at_whole(...arguments)
    },

    remove_at_whole(){
        this.safeCursor(()=>{
            this.$target.remove()
            this.target.remove()
        })
    },

    remove_at_whole_paragraph_up_to_document(){
        this.$target.remove()
        this.target.remove()
        this.create_first_paragraph()
    },

    remove_at_beginning_of_up_to_paragraph(){
        const $p=this.$target.closest("paragraph")
        this.remove_whole()
        this.cursorAt($p.attr('id'),0)
    },

    remove_cell(){

    },

    remove_column(){
        
    },

    remove_row(){
        const $row=this.$target.closest("row")
        if($row.length>0){
            const $table=$row.closest('table')
            if($table.find("row").length==1){
                this.remove_table()
            }else{
                this.selectWhole($row.attr('id'))
                this.remove_at_whole()
            }
        }
    },

    remove_table(){
        const table=this.$target.closest("table")
        if(table.length>0){
            this.selectWhole(table.attr('id'))
            this.remove_at_whole()
        }
    }
}