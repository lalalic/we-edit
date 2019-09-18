import React, {Fragment} from "react"
import PropTypes from "prop-types"
import memoize from "memoize-one"
import {shallowEqual} from "we-edit"
import vm from "vm"

import $ from "./$"

export default ({Text,Container})=>class __$1 extends ${
    static displayName="$exp"
    static propTypes={
        expression:PropTypes.string.isRequired,
        name: PropTypes.string
    }

    static defaultProps={
        expression:""
    }

	render(){
        const {expression,name, children, ...props}=this.props
        let text=(Array.isArray(children) ? children[0] : children)||<Text {...props}/>
        let content=children
        if(this.canAssemble){
            const value=this.getValue({variantContext:this.context.variantContext, expression,name})
    		content=React.cloneElement(text,{children:value+"", color:"red"})
        }else{
			let {children:textContent=""}=text.props
			if(Array.isArray(textContent))
				textContent=textContent.join("")
            content=React.cloneElement(text,{children:textContent||`{${expression}}`})
        }

        return (<Container {...props} type={this.constructor.displayName}>{content}</Container>)
	}


	getValue=memoize(({variantContext,expression,name})=>{
        return this.eval(name ? `var ${name}=${expression}; ${name}` : expression, variantContext)
	},shallowEqual)
}
