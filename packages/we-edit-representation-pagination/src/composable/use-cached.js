import React,{Component,Fragment} from "react"
import PropTypes from "prop-types"

export default class UseCached extends Component{
    static displayName="UseCached"
    static contextTypes={
        mount: PropTypes.func,
    }

    static create(el){
        if(typeof(el)=="object"){
            const {type, props:{id,...props}}=el
            return <UseCached __type__={typeof(type)=="string" ? type : type.displayName} {...props} {...{id,key:id}}/>
        }
        return null
    }

    constructor({id}){
        super(...arguments)
        id && this.context.mount(id)
    }

    shouldComponentUpdate({id}){
        id && this.context.mount(id)
        return true
    }

    render(){
        const {children}=this.props
        if(typeof(children)!=="object")
            return null
        return (
            <Fragment>
                {React.Children.toArray(children).map(UseCached.create)}
            </Fragment>
        )
    }
}