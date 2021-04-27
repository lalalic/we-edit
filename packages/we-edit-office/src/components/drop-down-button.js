import React, {Component, Fragment} from "react"
import Menu from 'material-ui/Menu'
import Popover from "material-ui/Popover"
import SizeIconButton from "../components/size-icon-button"
import IconMore from 'material-ui/svg-icons/navigation/arrow-drop-down'

export default class DropdownButton extends Component{
	state={open:false}
	render(){
		const {open,anchor}=this.state
		const toggle=this.toggle.bind(this)
		const {icon, menuStyle={},
			children, labelStyle={fontSize:"xx-small"},
			status, onClick=toggle, ...props}=this.props
		
		const menus=open && (
			<Popover 
				open={true} 
				anchorEl={anchor}
				onRequestClose={e=>this.setState({open:false})}>
				<Menu
					style={menuStyle} 
					onClick={e=>this.setState({open:false})}>
					{children}
				</Menu>
			</Popover>
		)
		return (
			<Fragment>
				<SizeIconButton onClick={onClick||toggle} {...props} status={status}>
					{icon}
				</SizeIconButton>
				{false && (<span style={labelStyle} onClick={onClick}>{label}</span>)}
				<IconMore style={{height:24,width:6}} viewBox="8 0 18 36" onClick={toggle}/>
				{menus}
			</Fragment>
		)
	}
	
	toggle(e){
		this.setState({open:!this.state.open, anchor:e.currentTarget.parentNode})
	}
}