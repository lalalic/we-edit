import React, {Component, Fragment} from "react"
import PropTypes from "prop-types"


export default ({Container})=>class __$1 extends Component{
	static displayName="run"
	static propTypes={
		style: PropTypes.object.isRequired
	}

	static contextTypes={
		style: PropTypes.object
	}

	static childContextTypes={
		style: PropTypes.object
	}

	getChildContext(){
		const {style, ...props}=this.props
		return {
			style: this.style(style, this.context.style)
		}
	}

	style=(direct, context)=>direct.flat(context)

	render(){
		const {style, ...props}=this.props
		return (<Container {...props} type={this.constructor.displayName}/>)
	}
}
