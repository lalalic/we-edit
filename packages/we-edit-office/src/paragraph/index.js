import React from "react"
import PropTypes from "prop-types"

import {compose,setDisplayName,mapProps, shallowEqual,shouldUpdate, withContext} from "recompose"
import {ACTION, whenSelectionChange,getUI} from "we-edit"

import {ToolbarGroup,ToolbarSeparator,MenuItem, SvgIcon} from "material-ui"
import CheckIconButton from "../components/check-icon-button"
import DropDownButton from "../components/drop-down-button"


import IconAlignCenter from "material-ui/svg-icons/editor/format-align-center"
import IconAlignLeft from "material-ui/svg-icons/editor/format-align-left"
import IconAlignRight from "material-ui/svg-icons/editor/format-align-right"
import IconAlignJustify from "material-ui/svg-icons/editor/format-align-justify"

import IconListBullet from "material-ui/svg-icons/editor/format-list-bulleted"
import IconListNumber from "material-ui/svg-icons/editor/format-list-numbered"

export default compose(
	setDisplayName("ParagraphStyle"),
	whenSelectionChange(({selection},state)=>{
		if(selection)
			return {style:selection.props("paragraph",false),...getUI(state)}
		return getUI(state)
	}),
	withContext({disabled:PropTypes.bool},({style})=>({disabled:!style})),
	mapProps(({dispatch,children,style,pilcrow})=>{
		return {
			children,
			style,
			pilcrow,
			toggleAlign(align){
				const {align:current="left"}=style||{}
				if(current==align){
					align=null
				}
				dispatch(ACTION.Selection.UPDATE({paragraph:{align}}))
			},
			numbering: numbering=>{
				dispatch(ACTION.Selection.UPDATE({paragraph:{numbering}}))
			},
			toggleBullet(numbering){
				if(style&&style.numbering&&style.numbering.format=="bullet"){
					numbering=null
				}
				dispatch(ACTION.Selection.UPDATE({paragraph:{numbering}}))
			},
			toggleNumbering(numbering){
				if(style&&style.numbering&&style.numbering.format!=="bullet"){
					numbering=null
				}
				dispatch(ACTION.Selection.UPDATE({paragraph:{numbering}}))
			},
			togglePilcrow(){
				dispatch(ACTION.UI({pilcrow:!pilcrow}))
			}
		}
	}),
	shouldUpdate((a,b)=>!(shallowEqual(a.style,b.style) && a.pilcrow==b.pilcrow))
)(({style, toggleAlign,numbering, bullet, toggleBullet, toggleNumbering, pilcrow, togglePilcrow,children})=>(
	<ToolbarGroup>
		<CheckIconButton
			status={style &&(!style.align ||style.align=="left")?"checked":"unchecked"}
			onClick={()=>toggleAlign("left")}
			children={<IconAlignLeft/>}
			/>
		<CheckIconButton
			status={style&&style.align=="center"?"checked":"unchecked"}
			onClick={()=>toggleAlign("center")}
			children={<IconAlignCenter/>}
			/>
		<CheckIconButton
			status={style &&style.align=="right"?"checked":"unchecked"}
			onClick={()=>toggleAlign("right")}
			children={<IconAlignRight/>}
			/>
		<CheckIconButton
			status={style&&style.align=="justify"?"checked":"unchecked"}
			onClick={()=>toggleAlign("justify")}
			children={<IconAlignJustify/>}
			/>
		<ToolbarSeparator style={{marginRight:2, marginLeft:2}}/>

		<DropDownButton
			status={style&&style.numbering&&style.numbering.format=="bullet" ?"checked":"unchecked"}
			onClick={()=>toggleBullet({type:"bullet",text:"."})}
			icon={<IconListBullet/>}
			>
			<MenuItem primaryText="." onClick={e=>numbering({type:"bullet",text:"."})}/>
			<MenuItem primaryText="*" onClick={e=>numbering({type:"bullet",text:"*"})}/>

		</DropDownButton>
		<DropDownButton
			status={style&&style.numbering&&style.numbering.format!=="bullet" ?"checked":"unchecked"}
			onClick={()=>toggleNumbering({type:"decimal",text:"%1."})}
			icon={<IconListNumber/>}
			>
			<MenuItem primaryText="1." onClick={e=>numbering({type:"decimal",text:"%1."})}/>
			<MenuItem primaryText="a." onClick={e=>numbering({type:"lowerLetter",text:"%1."})}/>
			<MenuItem primaryText="一" onClick={e=>numbering({type:"chinese", text:"%1"})}/>
		</DropDownButton>
		<ToolbarSeparator style={{marginRight:2, marginLeft:2}}/>
		<CheckIconButton
			status={pilcrow ? "checked" : "unchecked"}
			onClick={togglePilcrow}
			children={
				<SvgIcon>
					<g transform="translate(0 4)">
						<path d="M9 10v5h2V4h2v11h2V4h2V2H9C6.79 2 5 3.79 5 6s1.79 4 4 4z"/>
					</g>
				</SvgIcon>
			}
			/>
		{children}
	</ToolbarGroup>
))
