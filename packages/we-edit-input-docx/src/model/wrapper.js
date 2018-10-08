import React, {Component} from "react"
import PropTypes from "prop-types"


export default ({Container})=>class extends Component{
	static displayName="wrapper"
	render(){
		const {children, id, changed, selfChanged, ...others}=this.props
		return (
			<Container {...{id, changed, selfChanged}}>
				{React.cloneElement(children[0], others)}
			</Container>
		)
	}
}
