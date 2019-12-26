import PropTypes from "prop-types"
export default A=>class __$1 extends A{
    static displayName=`stoppable-${A.displayName}`
    static contextTypes={
        ...A.contextTypes,
        shouldContinueCompose: PropTypes.func
    }

    render(){
        if(this.context.shouldContinueCompose && !this.context.shouldContinueCompose(this)){
            console.debug(`${this.getComposeType()}[${this.props.id}] skip composed`)
            return null
        }

        return super.render()
    }
}
