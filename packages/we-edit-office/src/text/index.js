import React, {Component} from "react"
import PropTypes from "prop-types"

import {ACTION} from "we-edit"

import {compose,setDisplayName,getContext,mapProps,withProps} from "recompose"

import {ToolbarGroup,TextField,SelectField, MenuItem,SvgIcon,ToolbarSeparator as ToolbarSeparator0,} from "material-ui"

import ComboBox from "../components/combo-box"
import CheckIconButton from "../components/check-icon-button"
import DropDownButton from "../components/drop-down-button"
import ColorButton from "../components/color-button"

import IconBold from "material-ui/svg-icons/editor/format-bold"
import IconItalic from "material-ui/svg-icons/editor/format-italic"
import IconUnderlined from "material-ui/svg-icons/editor/format-underlined"

import IconClear from "material-ui/svg-icons/editor/format-clear"
import IconStrike from "material-ui/svg-icons/editor/strikethrough-s"
import IconBackground from "material-ui/svg-icons/editor/format-color-fill"
import IconColor from "material-ui/svg-icons/editor/format-color-text"

import FontList from "./fonts"
const ToolbarSeparator=props=><ToolbarSeparator0 style={{marginRight:2, marginLeft:2}} {...props}/>

export default compose(
	setDisplayName("TextStyle"),
	getContext({
		store:PropTypes.object,
		doc: PropTypes.object,
		selection: PropTypes.object
	}),
	withProps(({store:{dispatch},selection})=>{
		let style=selection ? selection.props("text",false) : null
		let changeSize=size=>dispatch(ACTION.Style.update({text:{size}}))
		return {
			style,
			toggleB:b=>dispatch(ACTION.Style.update({text:{bold:b}})),
			toggleI:b=>dispatch(ACTION.Style.update({text:{italic:b}})),
			toggleU:b=>dispatch(ACTION.Style.update({text:{underline:b}})),
			changeFont:fonts=>dispatch(ACTION.Style.update({text:{fonts}})),
			changeSize,
			smaller(){
				changeSize(Math.max(style.size-Math.ceil(Math.abs((style.size-8)/5)),8))
			},
			bigger(){
				changeSize(style.size+2)
			},
			changeHightlight(highlight){
				dispatch(ACTION.Style.update({text:{highlight}}))
			},
			changeColor(color){
				dispatch(ACTION.Style.update({text:{color}}))
			},
			clear(_clear=true){
				dispatch(ACTION.Style.update({text:{_clear}}))
			},
			toggleBorder(border={}){
				dispatch(ACTION.Style.update({text:{border}}))
			},
			underline(underline){
				dispatch(ACTION.Style.update({text:{underline}}))
			},
			toggleStrike(strike){
				dispatch(ACTION.Style.update({text:{strike}}))
			}
		}
	})
)(({doc, style, children,
	bigger, smaller, clear,
	toggleStrike, changeHightlight,changeColor,
	toggleSubscript, toggleSuperscript, toggleBorder,
	toggleB, toggleI, underline,
	changeFont,changeSize})=>(
	<ToolbarGroup>
		<FontList label="font"
			disabled={style==null}
			value={style ? style.fonts.split(",")[0] : ""}
			changeFont={changeFont}/>
		<ComboBox label="font size"
			disabled={style==null}
			style={{width:50}}
			inputStyle={{border:"1px solid lightgray"}}
			value={style ? style.size: 11}
			onChange={value=>changeSize(parseInt(value))}
			dataSource={[8,9,10,11,12,14,16,20,22,24,26,28,36,72].map(a=>a+"")}
			underlineShow={false}
			/>
		<CheckIconButton label="increase font size" hint="make text a bit bigger"
			status={!style ? "disabled" : "unchecked"}
			onClick={bigger}
			children={<IconBigger/>}
			/>
		<CheckIconButton label="descrease font size" hint="make text a bit smaller"
			status={!style ? "disabled" : "unchecked"}
			onClick={smaller}
			children={<IconSmaller/>}
			/>
		<ToolbarSeparator/>

		<CheckIconButton label="bold"
			status={!style ? "disabled" : style.bold?"checked":"unchecked"}
			onClick={()=>toggleB(!style.bold)}
			children={<IconBold/>}
			/>
		<CheckIconButton label="italic"
			status={!style ? "disabled" : style.italic?"checked":"unchecked"}
			onClick={()=>toggleI(!style.italic)}
			children={<IconItalic/>}
			/>
		<DropDownButton label="underline"
			status={!style ? "disabled" : style.underline?"checked":"unchecked"}
			onClick={a=>underline(style&&style.underline ? "" : "single")}
			icon={<IconUnderlined/>}
			>
			{"single,double,dot,dash".split(",").map(a=>
				<MenuItem
					key={a}
					onClick={e=>underline(a)}
					primaryText={a}
					/>
			)}
		</DropDownButton>

		<CheckIconButton label="strikethrough"
			status={!style ? "disabled" : style.strike?"checked":"unchecked"}
			onClick={()=>toggleStrike(!style.strike)}
			children={<IconStrike/>}
			/>
		<ToolbarSeparator/>

		<CheckIconButton label="Subscript"
			status={true||!style ? "disabled" : style.subscript?"checked":"unchecked"}
			onClick={()=>toggleSubscript(!style.subscript)}
			children={<IconSubscript/>}
			/>
		<CheckIconButton label="Superscript"
			status={true||!style ? "disabled" : style.superscript?"checked":"unchecked"}
			onClick={()=>toggleSuperscript(!style.superscript)}
			children={<IconSuperscript/>}
			/>

		<CheckIconButton label="text border"
			onClick={toggleBorder}
			children={<IconTextBorder/>}
			/>

		<ColorButton label="text highlight color"
			status={!style ? "disabled" : style.highlight?"checked":"unchecked"}
			onChange={color=>changeHightlight(color)}>
			<IconBackground/>
		</ColorButton>

		<ColorButton label="text color"
			status={!style ? "disabled" : style.color?"checked":"unchecked"}
			onChange={color=>changeColor(color)}>
			<IconColor/>
		</ColorButton>

		<ToolbarSeparator/>
		<CheckIconButton label="clear all text formatting"
			onClick={clear}
			children={<IconClear/>}
			/>

		{children}
	</ToolbarGroup>
))

const IconSuperscript=props=>(
	<SvgIcon {...props}>
		<g transform="translate(0 3) scale(0.7)">
			<path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
		</g>
		<text x="15" y="9" style={{fontSize:9}}>2</text>
	</SvgIcon>
)

const IconSubscript=props=>(
	<SvgIcon {...props}>
		<g transform="translate(0 3) scale(0.7)">
			<path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
		</g>
		<text x="15" y="20" style={{fontSize:9}}>2</text>
	</SvgIcon>
)

const IconBigger=props=>(
	<SvgIcon {...props}>
		<g transform="translate(0 2)">
			<path d="M5 17m4.5-4.2h5l.9 2.2h2.1L12.75 4h-1.5L6.5 15h2.1l.9-2.2zM12 5.98L13.87 11h-3.74L12 5.98z"/>
		</g>
		<g transform="translate(18 2)">
			<path d="M0 3H6L3 0z"/>
		</g>
	</SvgIcon>
)

const IconSmaller=props=>(
	<SvgIcon {...props}>
		<g transform="translate(0 2)">
			<path d="M5 17m4.5-4.2h5l.9 2.2h2.1L12.75 4h-1.5L6.5 15h2.1l.9-2.2zM12 5.98L13.87 11h-3.74L12 5.98z"/>
		</g>
		<g transform="translate(18 2)">
			<path d="M0 0 H6L3 3z"/>
		</g>
	</SvgIcon>
)

const IconTextBorder=props=>(
	<SvgIcon {...props}>
		<g transform="translate(0 2)">
			<path d="M5 17m4.5-4.2h5l.9 2.2h2.1L12.75 4h-1.5L6.5 15h2.1l.9-2.2zM12 5.98L13.87 11h-3.74L12 5.98z"/>
		</g>
		<path d="M2 2 h20v20h-20z" fill="none" stroke="black"/>
	</SvgIcon>
)
