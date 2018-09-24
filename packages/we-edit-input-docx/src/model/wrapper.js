import React, {Component} from "react"
import PropTypes from "prop-types"


export default ({})=>class extends Component{
	static displayName="wrapper"
	render(){
		let {children, id, changed, selfChanged, ...others}=this.props
		return React.cloneElement(children[0], others)
	}
}
