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
					<Menu>
						{children}
					</Menu>
				</Popover>
			)
		}
		return (
			<span>
				<SizeIconButton onClick={toggle}>
					{icon}
				</SizeIconButton>
				{label && (<span style={labelStyle} onClick={toggle}>{label}</span>)}
				<SizeIconButton  onClick={toggle}>
					<IconMore/>
				</SizeIconButton>
				{menus}
			</span>
		)
	}
	
	toggle(e){
		this.setState({open:!this.state.open, anchor:e.currentTarget.parentNode})
	}
}