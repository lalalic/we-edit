import React, {Component} from "react"
import Menu from 'material-ui/Menu'
import Popover from "material-ui/Popover"
import SizeIconButton from "../components/size-icon-button"
import IconMore from 'material-ui/svg-icons/navigation/arrow-drop-down'

export default class extends Component{
	state={open:false}
	render(){
		const {open,anchor}=this.state
		const {icon, children, label, labelStyle={fontSize:"xx-small"}}=this.props
		const toggle=this.toggle.bind(this)
		let menus=null
		if(open){
			menus=(
				<Popover 
					open={true} 
					anchorEl={anchor}
					onRequestClose={e=>this.setState({open:false})}>
					<Menu onItemTouchTap={e=>this.setState({open:false})}>
						{children}
					</Menu>
				</Popover>
			)
		}
		return (
			<span hint={label}>
				<SizeIconButton onClick={toggle}>
					{icon}
				</SizeIconButton>
				{false && (<span style={labelStyle} onClick={toggle}>{label}</span>)}
				<IconMore style={{height:24,width:6}} viewBox="6 -12 18 36" onClick={toggle}/>
				{menus}
			</span>
		)
	}
	
	toggle(e){
		this.setState({open:!this.state.open, anchor:e.currentTarget.parentNode})
	}
}