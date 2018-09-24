import React, {Fragment} from "react"
import PropTypes from "prop-types"

import VariantProvider from "./variant-provider"

import Component from "./$"


export default ({Container})=>class extends Component{
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
            const {variantContext}=this.context
            const forContext={...variantContext}
            let loops=[]
            this.eval(init,forContext)
            for(let i=0; this.eval(test,forContext); this.eval(update,forContext), i++){
                loops.push(
                    <VariantProvider value={{...forContext}} key={i}>
                        {children}
                    </VariantProvider>
                )
            }
            content=loops
        }

        return <Container {...props} type={this.constructor.displayName}>{content}</Container>
    }
}
