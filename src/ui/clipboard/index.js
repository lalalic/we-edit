import React, {Component} from "react"
import PropTypes from "prop-types"
import {connect} from "react-redux"
import {compose, mapProps,getContext,setDisplayName} from "recompose"

import Input from "we-edit/input"

import {ToolbarGroup} from "material-ui"
import CheckIconButton from "we-edit-ui/components/check-icon-button"


import IconRedo from "material-ui/svg-icons/content/redo"
import IconUndo from "material-ui/svg-icons/content/undo"

import {ACTION, getActive, selector} from "we-edit"

export default compose(
	setDisplayName("clipboard"),
	getContext({store:PropTypes.object}),
	mapProps(({store:{dispatch}})=>({
		undo(){
			dispatch(ACTION.History.undo())
		},
		redo(){
			dispatch(ACTION.History.redo())
		}
	})),
	connect(state=>{
		let redos=selector.getRedos(state)
		let undos=selector.getUndos(state)
		return {
			canRedo:!!redos.length, 
			canUndo:!!undos.length
		}
	})
)(({undo,redo, canUndo, canRedo})=>(
	<ToolbarGroup>
		<CheckIconButton
			status={canUndo ? "uncheck" : "disabled"}
			children={<IconUndo/>}
			onClick={undo}
			/>
		<CheckIconButton
			status={canRedo ? "uncheck" : "disabled"}
			children={<IconRedo/>}
			onClick={redo}
			/>
	</ToolbarGroup>
))