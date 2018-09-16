import React, {Fragment} from "react"
import PropTypes from "prop-types"
import memoize from "memoize-one"
import vm from "vm-browserify"

import Component from "./$"

import {Composed} from "we-edit-representation-pagination"


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
            content=React.cloneElement(text,{children:text.props.children||`{${expression}}`})
        }

        return (content)
	}


	getValue=memoize((variantContext,expression,name)=>{
		return this.eval(name ? `var ${name}=${expression}; ${name}` : expression)
	})
}

class Marker extends Component{
    static contextTypes={
        parent: PropTypes.object
    }

    render(){
        this.context.parent.nextAvailableSpace()
        this.context.parent.appendComposed(
            <Composed.Group width={0} height={0}>
                {this.props.children}
            </Composed.Group>
        )
        return null
    }
}
