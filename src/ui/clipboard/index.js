import React, {Component} from "react"
import PropTypes from "prop-types"
import {connect} from "react-redux"
import {compose, mapProps,getContext,setDisplayName} from "recompose"

import Input from "we-edit/input"

import {ToolbarGroup} from "material-ui"
import {IconButton} from "we-edit-ui/with-no-doc"


import IconRedo from "material-ui/svg-icons/content/redo"
import IconUndo from "material-ui/svg-icons/content/undo"

import {ACTION} from "we-edit/state"

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
	connect(({canUndo,canRedo})=>({canUndo,canRedo}))
)(({undo,redo, canUndo, canRedo})=>(
	<ToolbarGroup>
		<IconButton
			disabled={!canUndo}
			children={<IconUndo/>}
			onClick={undo}
			/>
		<IconButton
			disabled={!canRedo}
			children={<IconRedo/>}
			onClick={redo}
			/>
	</ToolbarGroup>
))