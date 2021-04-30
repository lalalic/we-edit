import React,{Component,Fragment} from "react"
import PropTypes from "prop-types"
import {ReactQuery} from "we-edit"

/**
 * remount composers
 */
export default class UseCached extends Component{
    static displayName="UseCached"
    static contextTypes={
        mount: PropTypes.func,
        debug: PropTypes.bool,
        getComposer: PropTypes.func,
    }

    static create(el,getComposer){
        if(!React.isValidElement(el))
            return null

        //can't use cache if el has managed frame
        if(typeof(getComposer)=="function" && 
            (new ReactQuery(el).findFirst(b=>getComposer(el.props.id)?.props.manager).length==1)){
            return el
        }

        const {type, props:{id,...props}}=el
        const displayName=(typeof(type)=="string" ? type : type.displayName).split("-").pop()
        return <UseCached {...props} {...{id,key:`${displayName}[${id}]`}}/>
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
        const {props:{children,id},context:{debug, mount, getComposer}}=this
        getComposer(id)?.updateCalculationWhenUseCached?.()
        if(typeof(children)!=="object")
            return null
        
        if(!debug){
            new ReactQuery(<div>{children}</div>)
                .find('id').toArray()
                .forEach(({props:{id}})=>id && mount(id))
            return null
        }

        return (
            <Fragment>
                {React.Children.toArray(children).map(UseCached.create)}
            </Fragment>
        )
    }
}