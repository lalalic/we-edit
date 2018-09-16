import React, {Fragment} from "react"
import PropTypes from "prop-types"

import VariantProvider from "./variant-provider"

import Component from "./$"


export default Components=>class extends Component{
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
        const {init, test, update, ...props}=this.props
        if(this.canAssemble){
            const {variantContext}=this.context
            const forContext={...variantContext}
            let contents=[]
            this.eval(init,forContext)
            for(let i=0; this.eval(test,forContext); this.eval(update,forContext), i++){
                contents.push(
                    <VariantProvider value={{...forContext}} key={i}>
                        {this.props.children}
                    </VariantProvider>
                )
            }
            return (
                <Fragment>
                    {contents}
                </Fragment>
            )
        }

        return super.render()
    }
}
