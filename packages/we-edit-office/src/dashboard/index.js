import React, {Component, PureComponent} from "react"
import PropTypes from "prop-types"
import {compose,mapProps,getContext,setDisplayName,}  from "recompose"

import {Drawer,Menu, MenuItem, Avatar,Paper} from "material-ui"
import Divider from 'material-ui/Divider';
import {yellow500, gray100} from 'material-ui/styles/colors';

import IconLogo from "material-ui/svg-icons/editor/border-color"
import IconBack from "material-ui/svg-icons/navigation/arrow-back"

import {Save,Open,Create,Print} from "../file"
import OptionsUI from "./options"


export default class Dashboard extends PureComponent{
	state={action:null, display: false}
	render(){
		const {display,action}=this.state
		const done=()=>this.setState({display:false,action:null})
		const {active, zIndex, width=256, children, avatar, commands}=this.props
		return (
			<div style={{
					zIndex,
					position:"fixed",left:0,top:0,width:"100%",
					height:"100%", display:display ? "flex" : "none",
					flexDirection:"row"
				}}
				>
				<Paper zDepth={2} style={{width,height:"100%",backgroundColor:"white"}}>
						<center style={{zoom:2,marginTop:5}}>
							<Avatar 
								onClick={done}
								size={12} 
								style={{position:"absolute",left:10,top:10}}
								>
								<IconBack/>
							</Avatar>
							{avatar && React.cloneElement(avatar,{onClick:done}) || 
								<Avatar backgroundColor={gray100}>
									<IconLogo color={yellow500}/>
								</Avatar>
							}
						</center>

						<Menu width={width} autoWidth={!width}
							value={action}
							selectedMenuItemStyle={{background:"lightgray",color:"red"}}
							onChange={(e,action)=>{this.setState({action})}}
							>
							<MenuItem
								primaryText="New"
								value={<Create	onCancel={done} onCreate={done}/>}
								/>
							<MenuItem
								primaryText="Open"
								value={<Open onCancel={done} onLoad={done}/>}
								/>
								
							<MenuItem
								disabled={!active}
								primaryText="Save"
								value={<Save onCancel={done} onSave={done}/>}
								/>
							<MenuItem
								disabled={!active}
								primaryText="SaveAs"
								value={<Save onCancel={done} onSave={done}/>}
								/>
							<Divider/>

							<MenuItem
								disabled={!active}
								primaryText="Print"
								value={<Print doc={active} onCanncel={done} onPrint={done} />}
								/>

							<MenuItem
								primaryText="Options"
								value={<OptionsUI/>}
								/>

							{React.Children.map(children,function(a){
								let {value}=a.props
								if(!value){
									return React.cloneElement(a,{onClick:done})
								}
								
								return a
							})}
						</Menu>
				</Paper>
				<div style={{flex:"1 100%", backgroundColor:"lightgray",display:"flex",flexDirection:"column",padding:10}}>
					{action && React.cloneElement(action, {done}) || <div onClick={done} flex="1 100%" style={{height:"100%"}}/>}
				</div>
			</div>
		)
	}
}
