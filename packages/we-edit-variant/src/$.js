import React, {Component, Fragment} from "react"
import PropTypes from "prop-types"

export default class extends Component{
	static contextTypes={
		variantContext:PropTypes.object
	}
	
	render(){
		return (
			<Fragment>
				{this.props.children}
			</Fragment>
		)
	}
}
