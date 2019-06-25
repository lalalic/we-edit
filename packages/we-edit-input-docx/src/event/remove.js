import {Table} from "./dom"
export default {
    remove_column(){
        const cell=this.$target.closest("cell")
        if(cell.length>0){
            const editor=new Table(this.file)
            editor.node=this.target.closest("w\\:tbl")
            editor.update({remove:{id:cell.attr('id')}})
        }
    },
}