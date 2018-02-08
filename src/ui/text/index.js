import React, {Component} from "react"
import PropTypes from "prop-types"

import {ACTION} from "we-edit"

import {compose,setDisplayName,getContext,mapProps,withProps} from "recompose"
import {connect} from "react-redux"

import {ToolbarGroup,TextField,SelectField, MenuItem} from "material-ui"
import CheckIconButton from "we-edit-ui/components/check-icon-button"

import IconBold from "material-ui/svg-icons/editor/format-bold"
import IconItalic from "material-ui/svg-icons/editor/format-italic"
import IconUnderlined from "material-ui/svg-icons/editor/format-underlined"

import FontList from "./fonts"

export default compose(
	setDisplayName("TextStyle"),
	getContext({
		store:PropTypes.object,
		doc: PropTypes.object
	}),
	withProps(({store:{dispatch},doc})=>({
		doc,
		toggleB:b=>dispatch(ACTION.Style.update({text:{bold:b}})),
		toggleI:b=>dispatch(ACTION.Style.update({text:{italic:b}})),
		toggleU:b=>dispatch(ACTION.Style.update({text:{underline:b}})),
		changeFont:fonts=>dispatch(ACTION.Style.update({text:{fonts}})),
		changeSize:size=>dispatch(ACTION.Style.update({text:{size}})),
	})),
	connect(state=>({selection:state.get('selection')})),
)(({doc, style=doc.selection().props("text"), children,
	toggleB, toggleI, toggleU,
	changeFont,changeSize})=>(
	<ToolbarGroup>
		<FontList value={style ? style.fonts : []} changeFont={changeFont}/>
		<SelectField 
			style={{width:50,overflow:"hidden"}} 
			value={style ? style.size: 11} 
			onChange={(e,i,value)=>changeSize(value)}>
			{[8,9,10,11,12,14,16,20,22,24,26,28,36,72].map(a=><MenuItem key={a} value={a} primaryText={a}/>)}
		</SelectField>
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
		{children}
	</ToolbarGroup>
))
