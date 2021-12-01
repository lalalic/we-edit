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
		this.state={setting:false}
	}
	render(){
		const {props:{style, children,dispatch},state:{setting}}=this
		return (
			<ContextMenu.Support menus={
				<MenuItem primaryText="Font..." onClick={e=>dispatch(ACTION.UI({dialog:this.dialog(()=>dispatch(ACTION.UI({dialog:null})))}))}/>
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
						onClick={e=>this.setState({setting:true})}
						children={<IconMore/>}
						/>
					{setting && this.dialog(e=>this.setState({setting:false}))}
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

	dialog(close){
		const {style, dispatch}=this.props
		const refTextSetting=React.createRef()
		return (
			<Dialog title="Font Setting" 
				actions={[
					<FlatButton
						label="Set As Default..."
						onClick={()=>dispatch(ACTION.Entity.UPDATE({document:{defaultTextStyle:refTextSetting.current.value}}))}
					/>,

					<FlatButton
						label="Cancel"
						onClick={close}
					/>,
					
					<FlatButton
						label="Submit"
						primary={true}
						onClick={e=>{
							this.apply(refTextSetting.current.value)
							close()
						}}
					/>,
				]}
			>
				<PropTypesUI uiContext="Dialog" theme="Text" propTypes={dom.Text.propTypes} props={style} ref={refTextSetting}/>
			</Dialog>
		)
	}
}


