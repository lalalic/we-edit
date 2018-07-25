import React, {Component} from "react"
import PropTypes from "prop-types"

import {compose,setDisplayName,getContext,mapProps} from "recompose"
import {connect} from "react-redux"
import {getSelection} from "we-edit"

import {ToolbarGroup,ToolbarSeparator as ToolbarSeparator0,} from "material-ui"
import CheckIconButton from "../components/check-icon-button"
import DropDownButton from "../components/drop-down-button"


import IconAlignCenter from "material-ui/svg-icons/editor/format-align-center"
import IconAlignLeft from "material-ui/svg-icons/editor/format-align-left"
import IconAlignRight from "material-ui/svg-icons/editor/format-align-right"
import IconAlignJustify from "material-ui/svg-icons/editor/format-align-justify"

import IconListBullet from "material-ui/svg-icons/editor/format-list-bulleted"
import IconListNumber from "material-ui/svg-icons/editor/format-list-numbered"

const ToolbarSeparator=props=><ToolbarSeparator0 style={{marginRight:2, marginLeft:2}} {...props}/>

export default compose(
	setDisplayName("ParagraphStyle"),
	getContext({
		store:PropTypes.object,
		doc: PropTypes.object,
		selection: PropTypes.object
	}),
	mapProps(({store:{dispatch},doc,children,selection})=>({
		doc,children,
		style:selection ? selection.props("paragraph") : null,
		align:type=>dispatch(ACTION.Style.update({paragraph:{align:type}})),
	})),
	connect(state=>({selection:getSelection(state)})),
)(({doc,style, align,children})=>(
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
		<CheckIconButton
			status={!style ? "disabled" : style.align=="right"?"checked":"unchecked"}
			onClick={()=>align("right")}
			children={<IconAlignJustify/>}
			/>
		<ToolbarSeparator/>
		
		<DropDownButton
			status={!style ? "disabled" : (!style.align ||style.align=="left")?"checked":"unchecked"}
			onChange={()=>bullet()}
			icon={<IconListBullet/>}
			/>
		<DropDownButton
			status={!style ? "disabled" : style.align=="center"?"checked":"unchecked"}
			onchange={()=>number()}
			icon={<IconListNumber/>}
			/>
		
		{children}
	</ToolbarGroup>
))
