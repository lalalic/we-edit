export default {
    update_page({id, type, rotate, ...changing}){
        if(rotate!=undefined){
            const target=this.$target
            target.attr('rotate',rotate)
        }else{
            const target=this.$(`#${id}`)
            Object.keys(changing).forEach(k=>target.attr(k,changing[k]))
        }
    },

    update_frame(){

    },

    update_shape(){

    },

    update_untyped({id, ...changing}){
        const $target=id ? this.$('#'+id) : this.$target
        this.content.mergeIn([$target.attr('id'),'props'], changing)
    },

    update_origin({id,origin}){
        this.$('#'+id).attr('origin',origin)
    }
}