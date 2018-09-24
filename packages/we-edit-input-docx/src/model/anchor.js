import React, {Component} from "react"
import PropTypes from "prop-types"


export default ({Frame})=>class extends Component{
	static displayName="anchor"

	render(){
		return <Frame {...this.props}/>
	}
}
