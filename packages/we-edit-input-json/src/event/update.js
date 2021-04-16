import {Editors} from "we-edit-representation-pagination"
const Path=Editors.Shape.Path
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
    },

    update_at_shape({id, rotate, size, scale, outline, fill}){
        if(rotate!==undefined){
            this.$target.attr('rotate',rotate)
        }
        if(size){
            const geometry=this.$target.attr('geometry')
            if(!geometry){
                const target=this.$target.find('frame')
                const {width,height}=size
                if(width!==undefined)
                    target.attr('width',width)
                if(height!=undefined)
                    target.attr('height',height)
            }else{
                const size0=new Path(geometry).bounds()
                const {width=size0.width,height=size0.height}=size
                this.$target.attr("geometry",Path.fromRect({width,height}).toString())
            }
        }
    }
    
}