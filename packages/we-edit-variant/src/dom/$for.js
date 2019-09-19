import React, {Fragment} from "react"
import PropTypes from "prop-types"
import memoize from "memoize-one"
import {shallowEqual} from "we-edit"
import vm from "vm"

import VariantProvider from "../variant-provider"

import $ from "./$"


export default ({Container})=>class __$1 extends ${
    static displayName="$for"
    static propTypes={
        init: PropTypes.string.isRequired,
        test: PropTypes.string.isRequired,
        update: PropTypes.string.isRequired,
    }

    static defaultProps={
        init:"",
        test:"",
        update:"",
    }

    render(){
        const {init, test, update, children,...props}=this.props
        let content=children
        if(this.canAssemble){
            content=this.getLoopContent()
        }

        return <Container {...props} type={this.constructor.displayName}>{content}</Container>
    }

    getLoopContent(){
        const {init, test, update, children,...props}=this.props

        const forContext=vm.createContext({...this.context.variantContext})
        const loops=[]
        this.eval(init,forContext)
        for(let i=0; this.eval(test,forContext); this.eval(update,forContext), i++){
            loops.push(
                <VariantProvider value={{...forContext}} key={i}>
                    {children}
                </VariantProvider>
            )
        }
        return loops
    }
}
