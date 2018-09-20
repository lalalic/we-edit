import React, {Fragment} from "react"
import PropTypes from "prop-types"
import memoize from "memoize-one"
import vm from "vm"

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
        let content
        if(this.canAssemble){
            const value=this.getValue(this.context.variantContext, expression,name)
    		content=React.cloneElement(text,{children:value+"", color:"red"})
        }else{
			let {children:textContent}=text.props
			if(Array.isArray(textContent))
				textContent=textContent.join("")
            content=React.cloneElement(text,{children:textContent||`{${expression}}`})
        }

        return (content)
	}


	getValue=memoize((variantContext,expression,name)=>{
		return this.eval(name ? `var ${name}=${expression}; ${name}` : expression)
	})
}
