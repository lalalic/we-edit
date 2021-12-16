import React,{Component, Fragment} from "react"
import {ACTION, dom} from "we-edit"
import {ToolbarSeparator,FlatButton} from "material-ui"

import SelectStyle  from "../components/select-style"
import PropTypesUI from "../components/prop-types-ui"
import CheckIconButton from "../components/check-icon-button"
import ContextMenu from "../components/context-menu"
import {MenuItem} from "../components/menu"

import IconClear from "material-ui/svg-icons/editor/format-clear"
import IconMore from "material-ui/svg-icons/navigation/more-horiz"
import Dialog from "../components/dialog"

function getTextStyle(selection){
	const style=selection?.props("text",false)
	if(style?.size){
		style.size=dom.Unknown.UnitShape.normalize(style.size,"pt","px")+"pt"
	}
	return style
}

export default ({children})=>(
	<SelectStyle getStyle={getTextStyle}>
		{({style,dispatch,setting})=>{
			return (
				<ContextMenu.Support menus={
					<MenuItem primaryText="Font..." onClick={()=>setting('font')}/>
				}>
					<Fragment>
						<PropTypesUI 
							theme="Text" 
							propTypes={dom.Text.propTypes} 
							props={style} 
							onChange={text=>dispatch(ACTION.Selection.UPDATE({text}))}
							/>
						<ToolbarSeparator/>
						<CheckIconButton label="clear all text formatting"
							onClick={()=>dispatch(ACTION.Selection.UPDATE({text:{_clear:true}}))}
							children={<IconClear/>}
							/>
						<CheckIconButton label="Text setting..."
							onClick={()=>setting('font')}
							children={<IconMore/>}
							/>
						{children}
					</Fragment>
				</ContextMenu.Support>
			)
		}}
	</SelectStyle>
)

export function FontSetting(props){
	return (
		<SelectStyle getStyle={getTextStyle}>
			{({style,dispatch})=>{
				const refTextSetting=React.createRef()
				return (
					<Dialog 
						title="Font Setting" 
						onSubmit={e=>dispatch(ACTION.Selection.UPDATE({text:refTextSetting.current.value}))}
						moreActions={
							<FlatButton
								label="Set As Default..."
								onClick={()=>dispatch(ACTION.Entity.UPDATE({document:{defaultTextStyle:refTextSetting.current.value}}))}
							/>
						}
						{...props}
					>
						<PropTypesUI theme="Text" propTypes={dom.Text.propTypes} props={style} ref={refTextSetting}/>
					</Dialog>
				)
			}}
		</SelectStyle>
	)
}