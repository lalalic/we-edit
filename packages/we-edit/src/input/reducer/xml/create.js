export default{
    create({type,...props}){
        this.remove()
        this.emit("create_"+type.toLowerCase(),this.conds,...arguments)
		return this
    },
   
    create_table_at_text(){
        this.seperate_at_text_for_end()
        this.create(...arguments)
    },

    create_table_at_beginning_of_text(){
        this.create_table_at_beginning(...arguments)
    },

    create_table_at_end_of_text(){
        this.create_table_at_end(...arguments)
    },

    create_table_at_end(){
        const next=this.$target.forwardFirst()
        if(next.length>0 && next.attr('type')!='paragraph'){
            this.cursorAt(next.attr('id'),0)
        }
        this.create(...arguments) 
    },
      
    create_table_at_beginning(){
        this.seperate_up_to_paragraph_at_beginning()
        this.create(...arguments)
    },

    create_table_at_beginning_of_up_to_paragraph(){
        this.cursorAt(this.$target.closest("paragraph").attr('id'),0)
        this.create(...arguments)
    },

    create_table_at_end_of_up_to_paragraph(){
        this.cursorAt(this.$target.closest("paragraph").attr('id'),1)
        this.create(...arguments)
    },

    create_table_at_empty_paragraph(){
        this.create_table_at_beginning_of_paragraph(...arguments)
    },
}