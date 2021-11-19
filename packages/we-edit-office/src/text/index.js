import React,{Component, Fragment} from "react"
import {ACTION, whenSelectionChangeDiscardable, dom} from "we-edit"
import {compose,setDisplayName,withProps, shallowEqual,shouldUpdate,withState} from "recompose"
import {MenuItem,ToolbarSeparator,FlatButton} from "material-ui"

import PropTypesUI from "../components/prop-types-ui"
import CheckIconButton from "../components/check-icon-button"
import ContextMenu from "../components/context-menu"

import IconClear from "material-ui/svg-icons/editor/format-clear"
import IconMore from "material-ui/svg-icons/navigation/more-horiz"
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
		return {
			style,
			clear(_clear=true){
				dispatch(ACTION.Selection.UPDATE({text:{_clear}}))
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
				<PropTypesUI uiContext="Dialog" theme="Text" propTypes={dom.Text.propTypes} props={style} ref={refTextSetting}/>
			</Dialog>
		)
	}

	render(){
		const {style, children,dispatch,clear,setting, toggleSetting,apply,}=this.props
		return (
			<ContextMenu.Support menus={
				<MenuItem primaryText="Font..." onClick={e=>dispatch(ACTION.UI({dialog:this.dialog(()=>dispatch(ACTION.UI({dialog:null})))}))}/>
			}>
				<Fragment>
					<PropTypesUI 
						uiContext="Ribbon" 
						theme="Text" 
						propTypes={dom.Text.propTypes} 
						props={style} 
						onChange={apply}
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


