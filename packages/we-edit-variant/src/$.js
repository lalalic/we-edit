import React, {Component, Fragment} from "react"
import PropTypes from "prop-types"
import vm from "vm-browserify"

export default class extends Component{
	static contextTypes={
		variantContext:PropTypes.object,
		parent: PropTypes.object,
	}

	render(){
		return (
			<Fragment>
				{this.props.children}
			</Fragment>
		)
	}

	get canAssemble(){
		return !!this.context.variantContext
	}

	eval(expression, context){
		const {variantContext}=this.context
		try{
			return vm.runInNewContext(expression, context||{...variantContext})
		}catch(e){
			console.error(e)
			return ""
		}
	}
}
