import React, {Component, Fragment} from "react"
import PropTypes from "prop-types"
import Menu from 'material-ui/Menu'
import Popover from "material-ui/Popover"
import SizeIconButton from "../components/size-icon-button"
import IconMore from 'material-ui/svg-icons/navigation/arrow-drop-down'
import { MenuItem } from "material-ui"

export default class DropdownButton extends Component{
	static childContextTypes={
		onItemClick: PropTypes.func
	}

	constructor(){
		super(...arguments)
		this.state={open:false}
		this.menu=React.createRef()
	}
	getChildContext(){
		return {
			onItemClick:(...args)=>this.menu.current.props.onItemClick(...args),
		}
	}
	render(){
		const {open,anchor}=this.state
		const toggle=this.toggle.bind(this)
		const {
			children, labelStyle={fontSize:"xx-small"},menuStyle={},
			status, onClick=toggle, ...props}=this.props
		
		const menus=open && (
			<Popover 
				open={true} 
				anchorEl={anchor}
				onRequestClose={e=>this.setState({open:false})}>
				<Menu ref={this.menu}
					style={menuStyle} 
					disableAutoFocus={true}
					onEscKeyDown={e=>this.setState({open:false})}
					onItemClick={(e,item)=>{
						if(item?.props.menuItems){
							if(this.menu.current.focused!==item){
								this.menu.current.focused?.setState({open:false})
								this.menu.current.focused=item
							}
						}else{
							this.setState({open:false})
						}
					}}
					>	
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