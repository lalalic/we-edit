import React, {Component} from "react"
import Menu from 'material-ui/Menu'
import Popover from "material-ui/Popover"
import SizeIconButton from "../components/size-icon-button"
import IconMore from 'material-ui/svg-icons/navigation/arrow-drop-down'

export default class DropdownButton extends Component{
	state={open:false}
	render(){
		const {open,anchor}=this.state
		const toggle=this.toggle.bind(this)
		const {icon, 
			children, labelStyle={fontSize:"xx-small"},
			status, onClick=toggle, ...props}=this.props
		
		const menus=open && (
			<Popover 
				open={true} 
				anchorEl={anchor}
				onRequestClose={e=>this.setState({open:false})}>
				<Menu onClick={e=>this.setState({open:false})}>
					{children}
				</Menu>
			</Popover>
		)
		return (
			<span style={{whiteSpace:"nowrap"}}>
				<SizeIconButton onClick={onClick} {...props} status={status}>
					{icon}
				</SizeIconButton>
				{false && (<span style={labelStyle} onClick={onClick}>{label}</span>)}
				<IconMore style={{height:24,width:6}} viewBox="6 -12 18 36" onClick={toggle}/>
				{menus}
			</span>
		)
	}
	
	toggle(e){
		this.setState({open:!this.state.open, anchor:e.currentTarget.parentNode})
	}
}