import React, {Component} from "react"

import {ACTION,  connect, getSelectionStyle} from "we-edit"

import {compose,setDisplayName,withProps, shallowEqual} from "recompose"

import {ToolbarGroup,MenuItem,SvgIcon,ToolbarSeparator as ToolbarSeparator0,} from "material-ui"

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
	connect(state=>{
		const selection=getSelectionStyle(state)
		if(selection)
			return {style:selection.props("text",false)}
	}),
	withProps(({dispatch, style})=>{
		let changeSize=size=>dispatch(ACTION.Selection.UPDATE({text:{size}}))
		return {
			style,
			toggleB:b=>style && dispatch(ACTION.Selection.UPDATE({text:{bold:!style.bold}})),
			toggleI:b=>style && dispatch(ACTION.Selection.UPDATE({text:{italic:!style.italic}})),
			toggleU:b=>style && dispatch(ACTION.Selection.UPDATE({text:{underline:!style.underline}})),
			toggleSubscript:b=>style && dispatch(ACTION.Selection.UPDATE({text:{subscript:!style.subscript}})),
			toggleSuperscript:b=>style && dispatch(ACTION.Selection.UPDATE({text:{superscript:!style.superscript}})),
			changeFont:fonts=>dispatch(ACTION.Selection.UPDATE({text:{fonts}})),
			changeSize,
			smaller(){
				style && changeSize(Math.max(style.size-Math.ceil(Math.abs((style.size-8)/5)),8))
			},
			bigger(){
				style && changeSize(style.size+2)
			},
			changeHightlight(highlight){
				dispatch(ACTION.Selection.UPDATE({text:{highlight}}))
			},
			changeColor(color){
				dispatch(ACTION.Selection.UPDATE({text:{color}}))
			},
			clear(_clear=true){
				dispatch(ACTION.Selection.UPDATE({text:{_clear}}))
			},
			toggleBorder(border={}){
				dispatch(ACTION.Selection.UPDATE({text:{border}}))
			},
			underline(underline){
				dispatch(ACTION.Selection.UPDATE({text:{underline}}))
			},
			toggleStrike(){
				style && dispatch(ACTION.Selection.UPDATE({text:{strike:!style.strike}}))
			},

		}
	})
)(class extends Component{
	shouldComponentUpdate({style}){
		return !(style==this.props.style || shallowEqual(style, this.props.style))
	}

	render(){
		const {style, children,
			bigger, smaller, clear,
			toggleStrike, changeHightlight,changeColor,
			toggleSubscript, toggleSuperscript, toggleBorder,
			toggleB, toggleI, underline,
			changeFont,changeSize}=this.props
		return (
			<ToolbarGroup>
				<FontList
					value={style&&style.fonts ? style.fonts.split(",")[0] : ""}
					changeFont={changeFont}/>
				<ComboBox
					style={{width:50}}
					inputStyle={{border:"1px solid lightgray"}}
					value={style ? style.size: 11}
					onChange={value=>changeSize(parseInt(value))}
					dataSource={[8,9,10,11,12,14,16,20,22,24,26,28,36,72].map(a=>a+"")}
					underlineShow={false}
					/>
				<CheckIconButton label="increase font size"
					status={"unchecked"}
					onClick={bigger}
					children={<IconBigger/>}
					/>
				<CheckIconButton label="descrease font size"
					status={"unchecked"}
					onClick={smaller}
					children={<IconSmaller/>}
					/>
				<ToolbarSeparator/>

				<CheckIconButton label="bold"
					status={style&&style.bold ? "checked" : "unchecked"}
					onClick={()=>toggleB()}
					children={<IconBold/>}
					/>
				<CheckIconButton label="italic"
					status={style && style.italic?"checked":"unchecked"}
					onClick={()=>toggleI()}
					children={<IconItalic/>}
					/>
				<DropDownButton label="underline"
					status={style&&style.underline?"checked":"unchecked"}
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
					status={style&&style.strike?"checked":"unchecked"}
					onClick={()=>toggleStrike()}
					children={<IconStrike/>}
					/>
				<ToolbarSeparator/>

				<CheckIconButton label="Subscript"
					status={style&&style.subscript?"checked":"unchecked"}
					onClick={()=>toggleSubscript()}
					children={<IconSubscript/>}
					/>
				<CheckIconButton label="Superscript"
					status={style&&style.superscript?"checked":"unchecked"}
					onClick={()=>toggleSuperscript()}
					children={<IconSuperscript/>}
					/>

				<CheckIconButton label="text border"
					onClick={toggleBorder}
					children={<IconTextBorder/>}
					/>

				<ColorButton label="text highlight color"
					status={style&&style.highlight?"checked":"unchecked"}
					onChange={color=>changeHightlight(color)}>
					<IconBackground/>
				</ColorButton>

				<ColorButton label="text color"
					status={style&&style.color?"checked":"unchecked"}
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
		)
	}			
})

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
