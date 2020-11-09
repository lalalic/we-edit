import React, {Component} from "react"
import PropTypes from "prop-types"


export default ({Text})=>class __$1 extends Component{
	static displayName="text"
	static contextTypes={
		r: PropTypes.object
	}
	
	render(){
		return <Text {...{...this.context.r,...this.props}}/>
	}
}
