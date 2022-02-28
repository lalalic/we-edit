import PropTypes from "prop-types"
/**
 * whether it supports partial layout 
 * Row: always not
 * Paragraph: always not  
 * Container: depends on props.stoppable
 * Section: can stopped at the beginning, special since it's expensive to create layout
 */
export default (A,always=true)=>class __$1 extends A{
    static displayName=`stoppable-${A.displayName}`
    static contextTypes={
        ...super.contextTypes,
        shouldContinueCompose: PropTypes.func
    }

    render(){
        if(this.context.shouldContinueCompose){
            if(always || this.props.stoppable){
                if(!this.context.shouldContinueCompose(this)){
                    this.debug && console.debug(`${this.getComposeType()}[${this.props.id}] skip composed`)
                    return null
                }
            }
        }

        return super.render()
    }
}
