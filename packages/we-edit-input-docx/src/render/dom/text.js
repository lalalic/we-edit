import React, {Component} from "react"
import PropTypes from "prop-types"


export default ({Text})=>class __$1 extends Component{
	static displayName="text"
	static contextTypes={
		r: PropTypes.object
	}
	constructor(){
		super(...arguments)
		this.componentWillReceiveProps(this.props,this.context)
	}

	componentWillReceiveProps(next,context){
		this.style={...context.r,...next}
	}

	render(){
		return <Text {...this.style}/>
	}
}
