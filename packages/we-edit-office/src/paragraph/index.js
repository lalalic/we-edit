import React, {Component} from "react"
import PropTypes from "prop-types"

import {compose,setDisplayName,getContext,mapProps} from "recompose"
import {connect} from "react-redux"
import {getSelection, ACTION} from "we-edit"

import {ToolbarGroup,ToolbarSeparator as ToolbarSeparator0,MenuItem} from "material-ui"
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
		align:align=>dispatch(ACTION.Style.update({paragraph:{align}})),
		bullet: numFmt=>{
			dispatch(ACTION.Style.update({paragraph:{numFmt}}))
		},
		numbering: numFmt=>{
			dispatch(ACTION.Style.update({paragraph:{numFmt}}))
		}
	})),
	connect(state=>({selection:getSelection(state)})),
)(({doc,style, align,number, bullet, children})=>(
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
			status={true||!style ? "disabled" : style.align=="justify"?"checked":"unchecked"}
			onClick={()=>align("justify")}
			children={<IconAlignJustify/>}
			/>
		<ToolbarSeparator/>
		
		<DropDownButton
			status={!style||!style.numbering ? "disabled" : style.numbering.format=="bullet" ?"checked":"unchecked"}
			onClick={()=>bullet("")}
			icon={<IconListBullet/>}
			>
			<MenuItem primaryText="bullet" onClick={e=>bullet(".")}/>
			<MenuItem primaryText="circle" onClick={e=>bullet("o")}/>
			
		</DropDownButton>
		<DropDownButton
			status={!style||!style.numbering ? "disabled" : style.numbering.format!=="bullet" ?"checked":"unchecked"}
			onClick={()=>bullet("")}
			icon={<IconListNumber/>}
			>
			<MenuItem primaryText="1." onClick={e=>numbering("decimal")}/>
			<MenuItem primaryText="a." onClick={e=>numbering("lowerLetter")}/>
			<MenuItem primaryText="一" onClick={e=>numbering("chinese")}/>
		</DropDownButton>
		
		{children}
	</ToolbarGroup>
))
