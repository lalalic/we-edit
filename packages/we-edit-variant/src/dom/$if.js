import React, {Fragment} from "react"
import PropTypes from "prop-types"
import memoize from "memoize-one"
import {shallowEqual} from "we-edit"
import vm from "vm"

import VariantProvider from "../variant-provider"

import $ from "./$"


export default ({Container})=>class extends ${
    static displayName="$if"
    static propTypes={
		condition: PropTypes.string.isRequired
    }

    static defaultProps={
		condition: "true"
    }

    render(){
        const {condition, children, ...props}=this.props
        let content=children
        if(this.canAssemble){
            if(!this.meet({variantContext:this.context.variantContext,condition}))
                content=null
        }

        return (
            <Container {...props} type={this.constructor.displayName}>
                <VariantProvider value={{...this.context.variantContext}}>
                    {content}
                </VariantProvider>
            </Container>
        )
    }

    meet=memoize(({variantContext, condition})=>!!this.eval(condition,variantContext), shallowEqual)
}
