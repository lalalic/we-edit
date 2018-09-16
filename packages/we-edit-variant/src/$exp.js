import React from "react"
import PropTypes from "prop-types"
import memoize from "memoize-one"
import vm from "vm-browserify"

import Component from "./$"


export default ({Text,$exp})=>class extends Component{
    static displayName="$exp"
    static propTypes={
        expression:PropTypes.string.isRequired,
        name: PropTypes.string
    }

    static defaultProps={
        expression:""
    }

	render(){
        const {expression,name, children}=this.props
        let text=Array.isArray(children) ? children[0] : children
        if(this.canAssemble){
            const value=this.getValue(this.context.variantContext, expression,name)
    		return React.cloneElement(text,{children:value+"", color:"red"})
        }

        return React.cloneElement(text,{children:text.props.children||`{${expression}}`})

	}


	getValue=memoize((variantContext,expression,name)=>{
		return this.eval(expression)
	})
}
