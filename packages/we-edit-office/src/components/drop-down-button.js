import React, {Component, Fragment} from "react"
import PropTypes from "prop-types"
import Popover from "material-ui/Popover"
import SizeIconButton from "../components/size-icon-button"
import IconMore from 'material-ui/svg-icons/navigation/arrow-drop-down'
import {Menu} from '../components/menu'

export default class DropdownButton extends Component{
	static contextTypes={
		disabled:PropTypes.bool,
	}

	constructor(){
		super(...arguments)
		this.state={open:false}
	}

	render(){
		const {open,anchor}=this.state
		const toggle=this.toggle.bind(this)
		const {
			children, labelStyle={fontSize:"xx-small"},menuStyle={},
			status, onClick=toggle, ...props}=this.props
		
		const menus=!this.context.disabled && open && (
			<Popover 
				open={true} 
				anchorEl={anchor}
				onRequestClose={e=>this.setState({open:false})}>
				<Menu style={menuStyle} disableAutoFocus={true}>	
					{children}
				</Menu>
			</Popover>
		)
		return (
			<Fragment>
				<SizeIconButton onClick={onClick||toggle} {...props} status={status}/>
				{false && (<span style={labelStyle} onClick={onClick}>{label}</span>)}
				<IconMore style={{height:24,width:6}} viewBox="8 0 18 36" onClick={toggle}/>
				{menus}
			</Fragment>
		)
	}
	
	toggle(e){
		this.setState({open:!this.state.open, anchor:e.currentTarget})
	}
}