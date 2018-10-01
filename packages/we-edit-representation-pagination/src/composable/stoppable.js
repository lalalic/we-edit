import PropTypes from "prop-types"
export default A=>class extends A{
    static displayName=`stoppable-${A.displayName}`
    static contextTypes={
        ...A.contextTypes,
        shouldContinueCompose: PropTypes.func
    }

    render(){
        if(!this.context.shouldContinueCompose(this)){
            return null
        }

        return super.render()
    }
}
