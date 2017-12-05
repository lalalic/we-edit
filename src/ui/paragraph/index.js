import React, {Component} from "react"
import PropTypes from "prop-types"

import {compose,setDisplayName,getContext,mapProps} from "recompose"
import {connect} from "react-redux"
import {selector} from "we-edit"

import {ToolbarGroup} from "material-ui"
import CheckIconButton from "we-edit-ui/components/check-icon-button"

import IconAlignCenter from "material-ui/svg-icons/editor/format-align-center"
import IconAlignLeft from "material-ui/svg-icons/editor/format-align-left"
import IconAlignRight from "material-ui/svg-icons/editor/format-align-right"

export default compose(
	setDisplayName("ParagraphStyle"),
	getContext({
		store:PropTypes.object,
		doc: PropTypes.object
	}),
	mapProps(({store:{dispatch},doc})=>({
		doc,
		align:type=>dispatch(ACTION.style.paragraph.align(type)),
	})),
	connect(state=>({selection:selector.getSelection(state)})),
)(({doc,style=doc.selection().props("paragraph"), align})=>(
	<ToolbarGroup>
		<CheckIconButton
			status={!style ? "disabled" : (!style.align ||style.align=="left")?"checked":"unchecked"}
			onClick={()=>align("left")}
			children={<IconAlignLeft/>}
			/>
		<CheckIconButton
			status={!style ? "disabled" : style.align=="center"?"checked":"unchecked"}
			onClick={()=>align("center")}
			children={<IconAlignCenter/>}
			/>
		<CheckIconButton
			status={!style ? "disabled" : style.align=="right"?"checked":"unchecked"}
			onClick={()=>align("right")}
			children={<IconAlignRight/>}
			/>
	</ToolbarGroup>
))
