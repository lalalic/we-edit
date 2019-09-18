import React, {Fragment} from "react"
import PropTypes from "prop-types"
import memoize from "memoize-one"
import {shallowEqual} from "we-edit"
import vm from "vm"

import $ from "./$"

export default ()=>class __$1 extends ${
    render(){
        const {children,...props}=this.props
        const child=React.Children.only(children)
        return React.cloneElement(child, this.getResolvedProps({variantContext:this.context.variantContext, props}))
    }

    getResolvedProps=memoize(({variantContext, props})=>{
        const context=vm.createContext({...variantContext, $:a=>a})

        const resolveObject=ob=>Object.keys(ob).reduce((resolved, k)=>{
            switch(typeof(resolved[k]=ob[k])){
                case "object":
                    resolved[k]=resolveObject(ob[k])
                    break
                case "string":{
                    if(/^\$\(.*\)$/.test(ob[k])){
                        resolved[k]=this.eval(ob[k],context)
                        break
                    }
                }
            }
            return resolved
        },{})
        return resolveObject(props)
    },shallowEqual)
}
