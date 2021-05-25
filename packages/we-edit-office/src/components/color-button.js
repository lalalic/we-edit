import React, {Component}  from "react"
import {SvgIcon} from "material-ui"
import Popover from "material-ui/Popover"

import SizeIconButton from "../components/size-icon-button"
import IconMore from 'material-ui/svg-icons/navigation/arrow-drop-down'

import ColorSelector from "./select-color"

export default class ColorButton extends Component{
	constructor({value}){
		super(...arguments)
		this.state={open:false,color:value||"black"}
		this.container=React.createRef()
	}
	
	componentWillReceiveProps({value}){
		if(typeof(value)!="undefined"){
			this.setState({color:value||this.state.value||"black"})
		}
	}
	
	render(){
		const {open,color}=this.state
		const {onChange=a=>a,children, ...props}=this.props
		const toggle=e=>this.setState({open:!open})
		return (
			<span style={{whiteSpace:"nowrap"}} ref={this.container}>
				<SizeIconButton {...props} onClick={e=>props.status=="checked" ? onChange("") : toggle(e)}/>
				<IconMore style={{height:24,width:6}} viewBox="6 -12 18 36" onClick={toggle}/>
				{open && (
					<Popover 
						open={true} 
						anchorEl={this.container.current}
						onRequestClose={e=>this.setState({open:false})}>
						<ColorSelector onChange={color=>{this.setState({open:false,color});onChange(color)}}>
							{children}
						</ColorSelector>
					</Popover>
				)}
			</span>
		)
	}
}

const ColorableIcon=({children,value,viewBox,...props})=>{
	return (
		<SvgIcon {...{viewBox,...props}}>
			{React.cloneElement(children,{...props,viewBox:"0 0 32 32"})}
			<g transform="translate(5 20)">
				<path d="M0 0v2h14v-2h-14z" fill={value}/>
			</g>
		</SvgIcon>
	)
}