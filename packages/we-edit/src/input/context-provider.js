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
		readonly: PropTypes.bool,
	}

	static childContextTypes={
		doc: PropTypes.object,
		transformer: PropTypes.func,
		getCursorInput: PropTypes.func,
	}

	static contextTypes={
		store: PropTypes.object
	}

	getChildContext(){
		const self=this
		const doc=this.props.doc
		return {
			doc,
			transformer:this.props.transformer,
			getCursorInput(){
				return self.refs.input
			}
		}
	}

	componentDidMount(){
		if(this.props.readonly)
			return
		const store=this.context.store
		const state=store.getState()
		const {start:{id,at}}=getSelection(state)
		store.dispatch(Cursor.AT(id,at))
	}

	render(){
		const {children, readonly}=this.props
		return (
			<Fragment>
				{readonly ? null : <Input ref="input"/>}
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
