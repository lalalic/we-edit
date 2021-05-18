import React,{Component,Fragment} from "react"
import PropTypes from "prop-types"

import {compose,setDisplayName,mapProps, shallowEqual,shouldUpdate, withContext,withState} from "recompose"
import {ACTION, whenSelectionChangeDiscardable,getUI} from "we-edit"

import {ToolbarGroup,ToolbarSeparator,MenuItem, SvgIcon} from "material-ui"
import CheckIconButton from "../components/check-icon-button"
import DropDownButton from "../components/drop-down-button"
import ContextMenu from "../components/context-menu"

import ParagraphSetting from "./setting"
import {BulletList, NumberList, MultiLevelList} from "./numbering-setting"
import ListSetting from "./list-setting"


import IconAlignCenter from "material-ui/svg-icons/editor/format-align-center"
import IconAlignLeft from "material-ui/svg-icons/editor/format-align-left"
import IconAlignRight from "material-ui/svg-icons/editor/format-align-right"
import IconAlignJustify from "material-ui/svg-icons/editor/format-align-justify"

import IconListBullet from "material-ui/svg-icons/editor/format-list-bulleted"
import IconListNumber from "material-ui/svg-icons/editor/format-list-numbered"
import IconListOutline from "material-ui/svg-icons/editor/pie-chart-outlined"
import IconMore from "material-ui/svg-icons/navigation/more-vert"


export default compose(
	setDisplayName("ParagraphStyle"),
	whenSelectionChangeDiscardable(({selection},state)=>{
		if(selection)
			return {style:selection.props("paragraph",false),...getUI(state)}
		return getUI(state)
	}),
	withContext({disabled:PropTypes.bool},({style})=>({disabled:!style})),
	mapProps(({dispatch,children,style,pilcrow})=>{
		const props={
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
				if(numbering && style?.numbering){
					const {id,level=0}=style.numbering
					numbering={...numbering,id,level}
				}
				dispatch(ACTION.Selection.UPDATE({paragraph:{numbering}}))
			},
			toggleBullet(numbering){
				if(style?.numbering?.format=="bullet"){
					numbering=null
				}
				props.numbering(numbering)
			},
			toggleNumbering(numbering){
				if(style?.numbering?.format &&style.numbering.format!=="bullet"){
					numbering=null
				}
				props.numbering(numbering)
			},
			togglePilcrow(){
				dispatch(ACTION.UI({pilcrow:!pilcrow}))
			}
		}
		return props
	}),
	shouldUpdate((a,b)=>!(shallowEqual(a.style,b.style) && a.pilcrow==b.pilcrow)),
	withState("setting", "toggleSetting", {paragraph:false,bullet:false,numbering:false,multiLevel:false,list:false}),
)(({style, toggleAlign,numbering, bullet, toggleBullet, toggleNumbering, 
	pilcrow, togglePilcrow,children, setting, toggleSetting,
	bullets=[
		{style:{fonts:"Arial"},label:String.fromCharCode(0x25CF)},
		{style:{fonts:"Arial"},label:String.fromCharCode(0x25CB)},
		{style:{fonts:"Arial"},label:String.fromCharCode(0x25A0)},
		{style:{fonts:"Arial"},label:String.fromCharCode(0x2666)},
		{style:{fonts:"Arial"},label:String.fromCharCode(0x263A)},
		{style:{fonts:"Arial"},label:String.fromCharCode(0x263B)},
	],
	numbers=[
		{},

	]
})=>(
	<ContextMenu.Support menus={[
		<MenuItem key="paragraph" primaryText="Paragraph..." onClick={e=>e.dialog=<ParagraphSetting/>}/>,
		<MenuItem key="list" primaryText="Bullet/Numbering..." onClick={e=>e.dialog=<ListSetting/>}/>
	]}>
		<ToolbarGroup>
			<CheckIconButton
				status={style &&(!style.align ||style.align=="left")?"checked":"unchecked"}
				onClick={()=>toggleAlign("left")}
				children={<IconAlignLeft/>}
				hint="Align Left"
				/>
			<CheckIconButton
				status={style&&style.align=="center"?"checked":"unchecked"}
				onClick={()=>toggleAlign("center")}
				children={<IconAlignCenter/>}
				hint="Align Center"
				/>
			<CheckIconButton
				status={style &&style.align=="right"?"checked":"unchecked"}
				onClick={()=>toggleAlign("right")}
				children={<IconAlignRight/>}
				hint="Align Right"
				/>
			<CheckIconButton
				status={style&&style.align=="justify"?"checked":"unchecked"}
				onClick={()=>toggleAlign("justify")}
				children={<IconAlignJustify/>}
				hint="Justify"
				/>
			<ToolbarSeparator style={{marginRight:2, marginLeft:2}}/>

			<DropDownButton
				status={style?.numbering?.format=="bullet" ?"checked":"unchecked"}
				onClick={()=>toggleBullet({format:"bullet",...bullets[0]})}
				icon={<IconListBullet/>}
				hint="bullet list"
				>
				{bullets.map(({label,style:{fonts}},i)=>
					<MenuItem key={label} primaryText={label} style={{fontFamily:fonts}} onClick={e=>numbering({format:"bullet",...bulltes[i]})}/>
				)}
				<MenuItem primaryText="Define New Bullet" onClick={e=>toggleSetting({...setting,bullet:true})}/>
			</DropDownButton>
			<DropDownButton
				status={style?.numbering?.format && style.numbering.format!=="bullet" ?"checked":"unchecked"}
				onClick={()=>toggleNumbering({format:"decimal",label:"%1."})}
				icon={<IconListNumber/>}
				hint="numbered list"
				>
				<MenuItem primaryText="1." onClick={e=>numbering({format:"decimal",label:"%1."})}/>
				<MenuItem primaryText="a." onClick={e=>numbering({format:"lowerLetter",label:"%1."})}/>
				<MenuItem primaryText="A." onClick={e=>numbering({format:"upperLetter",label:"%1."})}/>
				<MenuItem primaryText="i." onClick={e=>numbering({format:"lowerRoman",label:"%1."})}/>
				<MenuItem primaryText="I." onClick={e=>numbering({format:"upperRoman",label:"%1."})}/>
				<MenuItem primaryText="一" onClick={e=>numbering({format:"chinese", label:"%1"})}/>

				<MenuItem primaryText="Define New Number List" onClick={e=>toggleSetting({...setting,numbering:true})}/>
			</DropDownButton>
			<DropDownButton
				status={"unchecked"}
				icon={<IconListOutline/>}
				hint="outline line"
				>
				<MenuItem primaryText="Define New Number List" onClick={e=>toggleSetting({...setting,multiLevel:true})}/>
			</DropDownButton>

			<ToolbarSeparator style={{marginRight:2, marginLeft:2}}/>
			<CheckIconButton
				status={pilcrow ? "checked" : "unchecked"}
				onClick={togglePilcrow}
				hint="Show/Hide❡"
				children={
					<SvgIcon>
						<g transform="translate(0 4)">
							<path d="M9 10v5h2V4h2v11h2V4h2V2H9C6.79 2 5 3.79 5 6s1.79 4 4 4z"/>
						</g>
					</SvgIcon>
				}
				/>
			<CheckIconButton
					label="paragraph settings..."
					onClick={e=>toggleSetting({...setting,paragraph:true})}
					children={<IconMore/>}
					/>

			{setting.paragraph && <ParagraphSetting  close={e=>toggleSetting({...setting,paragraph:false})}/>}
			{setting.bullet && <BulletList  {...style?.numbering} close={e=>toggleSetting({...setting,bullet:false})} />}
			{setting.numbering && <NumberList {...style?.numbering}  close={e=>toggleSetting({...setting,numbering:false})}/>}
			{setting.multiLevel && <MultiLevelList {...style?.numbering} close={e=>toggleSetting({...setting,multiLevel:false})}/>}
			{setting.list && <ListSetting  close={e=>toggleSetting({...setting,list:false})}/>}
			
			{children}
		</ToolbarGroup>
	</ContextMenu.Support>
))