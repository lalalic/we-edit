import React, {Fragment} from "react"
import PropTypes from "prop-types"
import memoize from "memoize-one"
import {shallowEqual} from "we-edit"
import vm from "vm"

import $ from "./$"

export default ()=>class extends ${
    render(){
        const {children, ...props}=this.props
        const child=React.Children.only(children)
        return React.cloneElement(child, this.getResolvedProps({variantContext:this.context.variantContext, props}))
    }

    getResolvedProps=memoize(({variantContext, props})=>{
        const context=vm.createContext({...variantContext, $:a=>a})

        const resolveObject=ob=>Object.keys(ob).reduce((resolved, k)=>{
            resolved[k]=typeof(ob[k])=="object" ? resolveObject(ob[k]) : this.eval(ob[k],context)
            return resolved
        },{})
        return resolveObject(props)
    },shallowEqual)
}
