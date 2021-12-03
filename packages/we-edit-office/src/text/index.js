import React,{Component, Fragment} from "react"
import {ACTION, dom} from "we-edit"
import {MenuItem,ToolbarSeparator,FlatButton} from "material-ui"

import SelectStyle  from "../components/select-style"
import PropTypesUI from "../components/prop-types-ui"
import CheckIconButton from "../components/check-icon-button"
import ContextMenu from "../components/context-menu"

import IconClear from "material-ui/svg-icons/editor/format-clear"
import IconMore from "material-ui/svg-icons/navigation/more-horiz"
import Dialog from "../components/dialog"

export default props=>(
	<SelectStyle 
		getStyle={selection=>{
			const style=selection?.props("text",false)
			if(style?.size){
				style.size=dom.Unknown.UnitShape.normalize(style.size,"pt","px")+"pt"
			}
			return style
		}}>
		{props=><TextStyle {...props}/>}
	</SelectStyle>
)

class TextStyle extends Component{
	constructor(){
		super(...arguments)
		this.clear=this.clear.bind(this)
		this.apply=this.apply.bind(this)
		this.setting=this.setting.bind(this)
	}
	render(){
		const {props:{style, children}}=this
		return (
			<ContextMenu.Support menus={
				<MenuItem primaryText="Font..." onClick={this.setting}/>
			}>
				<Fragment>
					<PropTypesUI 
						theme="Text" 
						propTypes={dom.Text.propTypes} 
						props={style} 
						onChange={this.apply}
						/>
					<ToolbarSeparator/>
					<CheckIconButton label="clear all text formatting"
						onClick={this.clear}
						children={<IconClear/>}
						/>
					<CheckIconButton label="Text setting..."
						onClick={this.setting}
						children={<IconMore/>}
						/>
					{children}
				</Fragment>
			</ContextMenu.Support>
		)
	}

	clear(){
		this.props.dispatch(ACTION.Selection.UPDATE({text:{_clear:true}}))
	}

	apply(text){
		this.props.dispatch(ACTION.Selection.UPDATE({text}))
	}

	setting(){
		const {style, dispatch}=this.props
		const refTextSetting=React.createRef()
		dispatch(ACTION.UI({dialog:
			<Dialog 
				title="Font Setting" 
				onSubmit={e=>this.apply(refTextSetting.current.value)}
				moreActions={
					<FlatButton
						label="Set As Default..."
						onClick={()=>dispatch(ACTION.Entity.UPDATE({document:{defaultTextStyle:refTextSetting.current.value}}))}
					/>
				}
			>
				<PropTypesUI uiContext="Dialog" theme="Text" propTypes={dom.Text.propTypes} props={style} ref={refTextSetting}/>
			</Dialog>
		}))
	}
}


