import React, {Component, Fragment} from "react"
import PropTypes from "prop-types"
import memoize from "memoize-one"

export default class AggregateContext extends Component{
    static propTypes={
        target: PropTypes.object.isRequired
    }

    get Provider(){
        return this.getAllContext(this.props.target.__reactInternalMemoizedUnmaskedChildContext)
    }

    /**it's to hack to inherit all context, so ReactDOMServer can  inherit the whole context*/
    getAllContext=memoize((context)=>{
        if(!context){
            throw new Error("target must define context, empty context is also ok")
        }
        
        const {value={}}=this.props
        const childContextTypes=[...Object.keys(value),...Object.keys(context)].reduce((ctx,k)=>{
            ctx[k]=PropTypes.any
            return ctx
        },{})

        return class AllContext extends Component{
            static childContextTypes=childContextTypes
            getChildContext(){
                const {value={}}=this.props
                return {
                    ...context,
                    ...value
                }
            }
            render(){
                return <Fragment>{this.props.children}</Fragment>
            }
        }
    })

    render(){
        const {value,children}=this.props
        return <this.Provider value={value}>{children}</this.Provider>
    }
}