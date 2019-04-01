import React, {Component, Fragment} from "react"
import PropTypes from "prop-types"
import vm from "vm"

export default class extends Component{
	static contextTypes={
		variantContext:PropTypes.object,
		parent: PropTypes.object,
	}

	scripts=new Map()

	get canAssemble(){
		return !!this.context.variantContext
	}

	eval(code, context){
		try{
			return vm.runInContext(code, context)
		}catch(e){
			return ""
		}
	}
}
