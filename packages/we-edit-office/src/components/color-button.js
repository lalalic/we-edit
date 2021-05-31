import React, {Component}  from "react"
import {SvgIcon} from "material-ui"
import Popover from "material-ui/Popover"

import SizeIconButton from "../components/size-icon-button"
import IconMore from 'material-ui/svg-icons/navigation/arrow-drop-down'
import IconColor from "material-ui/svg-icons/editor/format-color-fill"

import ColorSelector from "./select-color"

export default class ColorButton extends Component{
	constructor(){
		super(...arguments)
		this.state={open:false}
		this.container=React.createRef()
	}

	render(){
		const {open}=this.state
		const {onChange=a=>a,children,value:color, icon, ...props}=this.props
		const toggle=e=>this.setState({open:!open})
		return (
			<span style={{whiteSpace:"nowrap"}} ref={this.container}>
				<SizeIconButton {...props} icon={<ColorIcon {...{icon, color}}/>}
					onClick={e=>props.status=="checked" ? onChange("") : toggle(e)}/>
				<IconMore style={{height:24,width:6}} viewBox="6 -12 18 36" onClick={toggle}/>
				{open && (
					<Popover 
						open={true} 
						anchorEl={this.container.current}
						onRequestClose={e=>this.setState({open:false})}>
						<ColorSelector onChange={color=>{this.setState({open:false});onChange(color)}}>
							{children}
						</ColorSelector>
					</Popover>
				)}
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