export default {
    update_page(props){
        this.createEditor('page').update(props)
    },

    update_at_page(props){
        this.update_page(...arguments)
    },

    update_at_shape({anchor,shape,frame,...props}){
        anchor && this.createEditor('anchor',this.target.closest('anchor')).update(anchor)
        this.createEditor('shape').update(shape||props)
    },

    update_at_anchor(props){
        this.createEditor('anchor').update(props)
    },

    update_textbox({anchor,shape,frame, ...props}){
        anchor && this.createEditor('anchor',this.target.closest('anchor')).update(anchor)
        shape && this.createEditor('shape', this.target.closest('shape')).update(shape)
        this.createEditor('frame',this.target.closest('shape').findFirst("frame")).update(frame||props)
    }
}