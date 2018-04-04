import React, {Component, Fragment} from "react"
import PropTypes from "prop-types"
import TestRenderer from 'react-test-renderer'

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
		//return {props(type){}}, to calculate selection props
		selected:PropTypes.func
	}

	static contextTypes={
		store: PropTypes.object
	}

	//to calculate selection props from content by Type.renderUp
	selectedFromDoc(state){
		const self=this
		const {doc,renderUp}=this.props
		const Transformed=doc.Transformed
		const selection=getSelection(state)

		let {id,at}=selection[selection.cursorAt]

		let root=null
		try{
			root=TestRenderer.create(renderUp(state)).root
		}catch(e){
			root=TestRenderer.create(<div/>).root
		}

		const Type=type=>type[0].toUpperCase()+type.substr(1).toLowerCase()
		return {
			props(type){
				try{
					let found=root.findByType(Transformed[Type(type)])
					return found.props
				}catch(e){
					return null
				}
			}
		}
	}

	getChildContext(){
		const self=this
		const doc=this.props.doc
		let composedDoc=null
		return {
			doc,
			transformer:this.props.transformer,
			getCursorInput(){
				return self.refs.input
			},
			selected(state){
				return self.selectedFromDoc(state)
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
