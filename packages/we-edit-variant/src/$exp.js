import React from "react"
import PropTypes from "prop-types"
import memoize from "memoize-one"
import vm from "vm-browserify"

import Component from "./$"


export default ({Text})=>class extends Component{
    static displayName="$exp"
    static propTypes={
        expression:PropTypes.string.isRequired,
        name: PropTypes.string
    }

    static defaultProps={
        expression:""
    }
	
	render(){
		const {expression,name, ...props}=this.props
		return <Text {...props} color="red" children={this.getText()}/>
	}
	
	
	getValue=memoize((variantContext,expression,name)=>{
		if(variantContext){
			return vm.runInContext(expression, vm.createContext(variantContext))
		}
		
		return `{${name||expression}}`
	})
	
	getText(){
		const {variantContext}=this.context
		const {expression,name, ...props}=this.props
		return this.getValue(variantContext,expression,name)
	}
}
