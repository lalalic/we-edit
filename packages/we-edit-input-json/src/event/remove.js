export default{
    remove_page(){
        const target=this.$target
        const id=target.attr('id')
        target.remove()
        this.file.doc.removePage(_(id))
    },

    remove_frame(){

    }
}