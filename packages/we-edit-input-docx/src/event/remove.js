export default {
    remove_column(){
        const cell=this.$target.closest("cell")
        if(cell.length>0){
            this.update_at_table({id: this.$target.closest("table").attr("id"),remove:{id:cell.attr('id')}})
        }
    },
}