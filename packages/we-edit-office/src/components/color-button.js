import React, {Component}  from "react"
import {SvgIcon} from "material-ui"
import Popover from "material-ui/Popover"

import SizeIconButton from "../components/size-icon-button"
import IconMore from 'material-ui/svg-icons/navigation/arrow-drop-down'
import IconColor from "material-ui/svg-icons/editor/format-color-fill"

export default class ColorButton extends Component{
	constructor(){
		super(...arguments)
		this.state={open:false}
	}

	render(){
		const {open}=this.state
		const {onChange=a=>a,children,value:color, icon, ...props}=this.props
		const toggle=e=>this.setState({open:!open})
		return (
			<span style={{whiteSpace:"nowrap"}}>
				<SizeIconButton {...props} icon={<ColorIcon {...{icon, color}}/>}
					onClick={e=>props.status=="checked" ? onChange("") : toggle(e)}/>
				<IconMore style={{height:24,width:6}} viewBox="6 -12 18 36" onClick={toggle}/>
				{open && React.cloneElement(children,{value:color,onChange:v=>{onChange(v);toggle()}})}
			</span>
		)
	}
}

const ColorIcon=({icon, color, ...props})=>{
	icon=icon||<IconColor/>
	return (
		<SvgIcon {...{...icon.props, ...props}}>
			{React.cloneElement(icon,props)}
			<path d="M0 20h24v4H0z" fill={color||"none"}/>
		</SvgIcon>
	)
}