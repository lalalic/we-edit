export default {
    paragraphHasIndentSetting(){
        return !!this.$target.attr("indent")
    },

    backspace_at_beginning_of_text(){
        this.backspace_at_beginning(...arguments)
    },   
}