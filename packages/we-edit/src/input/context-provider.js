import React, {Component, Fragment} from "react"
import PropTypes from "prop-types"

import Input from "../components/cursor/input"
import {Cursor} from "../state/action"

import {getContent,getSelection,getFile,getParentId} from "../state/selector"

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
