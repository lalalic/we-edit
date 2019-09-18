import React from "react"
import PropTypes from "prop-types"
import vm from "vm"
import {Loader} from "we-edit"

import VariantProvider from "../variant-provider"

import $ from "./$"


export default Components=>class __$1 extends ${
    static displayName="$sub"
    static propTypes={
        transform:PropTypes.func,
        data: PropTypes.any
    }

    static defaultProps={
        transform:a=>a
    }

    render(){
        const {children,transform, data={...this.context.variantContext}, ...props}=this.props
        return (
            <VariantProvider value={transform(data)}>
                <Loader {...props}/>
            </VariantProvider>
        )
    }
}
