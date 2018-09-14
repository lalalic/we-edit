import React from "react"
import PropTypes from "prop-types"

import Component from "./$"


export default ({Text})=>class extends Component{
    static displayName="$exp"
    static propTypes={
        expression:PropTypes.string.isRequired,
        name: PropTypes.string
    }

    static defaultProps={
        expression:"",
        getText({name,expression}){
            return `{${name||expression}}`
        }
    }
	
	render(){
		const {variantContext}=this.context
		const {expression,name, ...props}=this.props
		const text=this.getText(variantContext,expression,name)
		return <Text {...props} color="red" children={text}/>
	}
	
	
	getText(variantContext,expression,name){
		if(variantContext)
			return vm.runInContext(expression, variantContext)
		
		return this.props.getText({expression,name})
	}
}
