import React, {Children, Component, PropTypes} from "react"

export default function(Models){
	return class Wrapper extends Component{
		static displayName="wrapper"

		render(){
			let {children, id, changed, selfChanged, ...others}=this.props
			return React.cloneElement(children[0], others)
		}
	}
}