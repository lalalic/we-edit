import React,{Component, Fragment} from "react"

import {ACTION, whenSelectionChangeDiscardable, dom} from "we-edit"

import {compose,setDisplayName,withProps, shallowEqual,shouldUpdate,withState} from "recompose"

import {MenuItem,ToolbarSeparator,FlatButton} from "material-ui"

import PropTypesUI from "../components/prop-types-ui"
import ComboBox from "../components/combo-box"
import CheckIconButton from "../components/check-icon-button"
import DropDownButton from "../components/drop-down-button"
import ColorButton from "../components/color-button"
import ContextMenu from "../components/context-menu"

import IconBold from "material-ui/svg-icons/editor/format-bold"
import IconItalic from "material-ui/svg-icons/editor/format-italic"
import IconUnderlined from "material-ui/svg-icons/editor/format-underlined"

import IconClear from "material-ui/svg-icons/editor/format-clear"
import IconStrike from "material-ui/svg-icons/editor/strikethrough-s"
import IconBackground from "material-ui/svg-icons/editor/format-color-fill"
import IconTextColor from "material-ui/svg-icons/editor/format-color-text"
import IconMore from "material-ui/svg-icons/navigation/more-horiz"
import { IconBigger, IconSmaller, IconSubscript, IconSuperscript, IconTextBorder } from "./icons"

import FontList from "../components/fonts"
import TextSetting from "./setting"
import Dialog from "../components/dialog"

const UnitShape=dom.Unknown.UnitShape
export default compose(
	setDisplayName("TextStyle"),
	whenSelectionChangeDiscardable(({selection})=>{
		if(selection){
			const style=selection.props("text",false)
			if(style?.size){
				style.size=UnitShape.normalize(style.size,"pt","px")
			}
			return {style}

		}
		return {}
	}),
	withProps(({dispatch, style})=>{
		const changeSize=size=>dispatch(ACTION.Selection.UPDATE({text:{size}}))
		return {
			style,
			toggleB:b=>style && dispatch(ACTION.Selection.UPDATE({text:{bold:!style.bold}})),
			toggleI:b=>style && dispatch(ACTION.Selection.UPDATE({text:{italic:!style.italic}})),
			toggleU:b=>style && dispatch(ACTION.Selection.UPDATE({text:{underline:!style.underline}})),
			toggleSubscript:b=>style && dispatch(ACTION.Selection.UPDATE({text:{vertAlign:style.vertAlign=="subscript" ? null : "subscript"}})),
			toggleSuperscript:b=>style && dispatch(ACTION.Selection.UPDATE({text:{vertAlign:style.vertAlign=="superscript" ? null : "superscript"}})),
			changeFont:fonts=>dispatch(ACTION.Selection.UPDATE({text:{fonts}})),
			changeSize,
			smaller(){
				if(style){
					const pt=Math.round(style.size*10)/10, d=Math.max(pt*0.1,1)
					changeSize(Math.max(Math.round(pt-d),1))
				}
			},
			bigger(){
				if(style){
					const pt=Math.round(style.size*10)/10, d=Math.max(pt*0.1,1)
					changeSize(Math.round(pt+d))
				}
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
			apply(text){
				dispatch(ACTION.Selection.UPDATE({text}))
			}
		}
	}),
	shouldUpdate((a,b)=>!shallowEqual(a.style,b.style)),
	withState("setting","toggleSetting",false)
)(class extends Component{
	dialog(close){
		const {toggleSetting, apply, style}=this.props
		const refTextSetting=React.createRef()
		close=close||(e=>toggleSetting(false));
		return (
			<Dialog title="Font Setting" 
				actions={[
					<FlatButton
						label="Cancel"
						onClick={close}
					/>,
					<FlatButton
						label="Submit"
						primary={true}
						onClick={e=>{
							apply(refTextSetting.current.state)
							close()
						}}
					/>,
				]}
			>
				<TextSetting style={style} ref={refTextSetting}/>
			</Dialog>
		)
	}

	render(){
		const {style, children,dispatch,
			bigger, smaller, clear,
			toggleStrike, changeHightlight,changeColor,
			toggleSubscript, toggleSuperscript, toggleBorder,
			toggleB, toggleI, underline,
			changeFont,changeSize, setting, toggleSetting,apply,
		}=this.props
		return (
			<ContextMenu.Support menus={
				<MenuItem primaryText="Font..." onClick={e=>dispatch(ACTION.UI({dialog:this.dialog(()=>dispatch(ACTION.UI({dialog:null})))}))}/>
			}>
				<Fragment>
					<PropTypesUI uiContext="Ribbon" theme="Text" propTypes={dom.Text.propTypes} props={style} onChange={apply}/>
					<FontList
						value={style?.fonts||""}
						onChange={changeFont}/>
					<ComboBox
						style={{width:50}}
						inputStyle={{border:"1px solid lightgray"}}
						value={style?.size||10}
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
						status={style?.bold ? "checked" : "unchecked"}
						onClick={()=>toggleB()}
						children={<IconBold/>}
						/>
					<CheckIconButton label="italic"
						status={style?.italic?"checked":"unchecked"}
						onClick={()=>toggleI()}
						children={<IconItalic/>}
						/>
					<DropDownButton label="underline"
						status={style?.underline?"checked":"unchecked"}
						onClick={a=>underline(style?.underline ? "" : "single")}
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
						status={style?.strike?"checked":"unchecked"}
						onClick={()=>toggleStrike()}
						children={<IconStrike/>}
						/>
					<ToolbarSeparator/>

					<CheckIconButton label="Subscript"
						status={style?.vertAlign=="subscript" ? "checked":"unchecked"}
						onClick={()=>toggleSubscript()}
						children={<IconSubscript/>}
						/>
					<CheckIconButton label="Superscript"
						status={style?.vertAlign=="superscript"?"checked":"unchecked"}
						onClick={()=>toggleSuperscript()}
						children={<IconSuperscript/>}
						/>

					<CheckIconButton label="text border"
						onClick={toggleBorder}
						children={<IconTextBorder/>}
						/>

					<ColorButton label="text highlight color"
						status={style?.highlight?"checked":"unchecked"}
						onChange={color=>changeHightlight(color)}
						value={style?.highlight||""}
						icon={<IconBackground/>}
						/>

					<ColorButton label="text color"
						status={style?.color?"checked":"unchecked"}
						onChange={color=>changeColor(color)}
						value={style?.color||"black"}
						icon={<IconTextColor/>}
						/>

					<ToolbarSeparator/>
					<CheckIconButton label="clear all text formatting"
						onClick={clear}
						children={<IconClear/>}
						/>
					<CheckIconButton label="Text setting..."
						onClick={e=>toggleSetting(true)}
						children={<IconMore/>}
						/>
					{setting && this.dialog()}
					{children}
				</Fragment>
			</ContextMenu.Support>
			)
		}
})


