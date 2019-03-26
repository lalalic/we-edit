import React, {Component} from "react"
import PropTypes from "prop-types"

import {compose,setDisplayName,getContext,mapProps} from "recompose"
import {getSelection, ACTION, connect, getSelectionStyle} from "we-edit"

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
	connect(state=>({selection:getSelectionStyle(state)})),
	mapProps(({dispatch,children,selection})=>({
		children,
		style:selection&&selection.props("paragraph",false)||null,
		align:align=>dispatch(ACTION.Selection.UPDATE({paragraph:{align}})),
		numbering: numbering=>{
			dispatch(ACTION.Selection.UPDATE({paragraph:{numbering}}))
		}
	})),
)(({style, align,numbering, bullet, children})=>(
	<ToolbarGroup>
		<CheckIconButton
			status={style &&(!style.align ||style.align=="left")?"checked":"unchecked"}
			onClick={()=>align("left")}
			children={<IconAlignLeft/>}
			/>
		<CheckIconButton
			status={style&&style.align=="center"?"checked":"unchecked"}
			onClick={()=>align("center")}
			children={<IconAlignCenter/>}
			/>
		<CheckIconButton
			status={style &&style.align=="right"?"checked":"unchecked"}
			onClick={()=>align("right")}
			children={<IconAlignRight/>}
			/>
		<CheckIconButton
			status={style&&style.align=="justify"?"checked":"unchecked"}
			onClick={()=>align("justify")}
			children={<IconAlignJustify/>}
			/>
		<ToolbarSeparator/>

		<DropDownButton
			status={style&&style.numbering&&style.numbering.format=="bullet" ?"checked":"unchecked"}
			onClick={()=>bullet("")}
			icon={<IconListBullet/>}
			>
			<MenuItem primaryText="." onClick={e=>numbering({type:"bullet",text:"."})}/>
			<MenuItem primaryText="*" onClick={e=>numbering({type:"bullet",text:"*"})}/>

		</DropDownButton>
		<DropDownButton
			status={style&&style.numbering&&style.numbering.format!=="bullet" ?"checked":"unchecked"}
			onClick={()=>bullet("")}
			icon={<IconListNumber/>}
			>
			<MenuItem primaryText="1." onClick={e=>numbering({type:"decimal",text:"%1."})}/>
			<MenuItem primaryText="a." onClick={e=>numbering({type:"lowerLetter",text:"%1."})}/>
			<MenuItem primaryText="一" onClick={e=>numbering({type:"chinese", text:"%1"})}/>
		</DropDownButton>

		{children}
	</ToolbarGroup>
))
