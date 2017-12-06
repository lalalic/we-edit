import React, {Component} from "react"
import PropTypes from "prop-types"

import {selector, ACTION} from "we-edit"

import {compose,setDisplayName,getContext,mapProps} from "recompose"
import {connect} from "react-redux"

import {ToolbarGroup} from "material-ui"
import CheckIconButton from "we-edit-ui/components/check-icon-button"

import IconBold from "material-ui/svg-icons/editor/format-bold"
import IconItalic from "material-ui/svg-icons/editor/format-italic"
import IconUnderlined from "material-ui/svg-icons/editor/format-underlined"

export default compose(
	setDisplayName("TextStyle"),
	getContext({
		store:PropTypes.object,
		doc: PropTypes.object
	}),
	mapProps(({store:{dispatch},doc})=>({
		doc,
		toggleB:b=>dispatch(ACTION.Style.text.bold(b)),
		toggleI:b=>dispatch(ACTION.style.text.italic(b)),
		toggleU:b=>dispatch(ACTION.style.text.underline(b)),
	})),
	connect(state=>({selection:state.get('selection')})),
)(({doc, style=doc.selection().props("text"), toggleB, toggleI, toggleU})=>(
	<ToolbarGroup>
		<CheckIconButton
			status={!style ? "disabled" : style.bold?"checked":"unchecked"}
			onClick={()=>toggleB(!style.bold)}
			children={<IconBold/>}
			/>
		<CheckIconButton
			status={!style ? "disabled" : style.italic?"checked":"unchecked"}
			onClick={()=>toggleI(!style.italic)}
			children={<IconItalic/>}
			/>
		<CheckIconButton
			status={!style ? "disabled" : style.underline?"checked":"unchecked"}
			onClick={()=>toggleU(!style.underline)}
			children={<IconUnderlined/>}
			/>
	</ToolbarGroup>
))
