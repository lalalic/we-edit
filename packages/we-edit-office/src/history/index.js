import React,{Fragment} from "react"
import {connect} from "react-redux"
import {compose, setDisplayName, onlyUpdateForKeys} from "recompose"

import CheckIconButton from "../components/check-icon-button"


import IconRedo from "material-ui/svg-icons/content/redo"
import IconUndo from "material-ui/svg-icons/content/undo"

import {ACTION, getUndos, getRedos, Input, getActive} from "we-edit"

export default compose(
	setDisplayName("history"),
	connect(state=>{
		state=getActive(state).state
		let redos=getRedos(state)
		let undos=getUndos(state)
		return {
			canRedo:!!redos.length,
			canUndo:!!undos.length
		}
	},(dispatch)=>{
		return {
			undo(){
				dispatch(ACTION.History.undo())
			},
			redo(){
				dispatch(ACTION.History.redo())
			}
		}
	}),
	onlyUpdateForKeys(['canRedo','canUndo'])
)(({undo,redo, canUndo, canRedo,children})=>(
	<Fragment>
		<CheckIconButton
			hint="undo"
			status={canUndo ? "uncheck" : "disabled"}
			children={<IconUndo/>}
			onClick={undo}
			/>
		<CheckIconButton
			hint="redo"
			status={canRedo ? "uncheck" : "disabled"}
			children={<IconRedo/>}
			onClick={redo}
			/>
		{children}
	</Fragment>
))
