import React, {Component, Fragment} from "react"
import PropTypes from "prop-types"
import vm from "vm"

export default class extends Component{
	static contextTypes={
		variantContext:PropTypes.object,
		parent: PropTypes.object,
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
