import React, {Component, Fragment} from "react"
import PropTypes from "prop-types"

export default class ContextProvider extends Component{
	static propTypes={
		doc: PropTypes.object,
		transformer: PropTypes.func.isRequired,
		onQuit: PropTypes.func,
	}

	static childContextTypes={
		doc: PropTypes.object,
		transformer: PropTypes.func,
	}

	getChildContext(){
		return {
			doc:this.props.doc,
			transformer:this.props.transformer
		}
	}


	render(){
		const {children, readonly,  doc}=this.props
		return (
			<Fragment>
				{children}
			</Fragment>
		)
	}

	componentWillUnmount(){
		let {onQuit}=this.props
		if(onQuit)
			onQuit()
	}
}
