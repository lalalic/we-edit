import React, {Component, PureComponent} from "react"
import PropTypes from "prop-types"
import {connect} from "react-redux"
import {compose,mapProps,getContext,setDisplayName,}  from "recompose"

import {Drawer,Menu, MenuItem, Avatar,Paper} from "material-ui"
import Divider from 'material-ui/Divider';
import {yellow500, gray100} from 'material-ui/styles/colors';

import IconLogo from "material-ui/svg-icons/editor/border-color"

import {Save,Open,Create,Print} from "../file"
import OptionsUI from "./options"

export default class Dashboard extends PureComponent{
	state={action:null, display: false}
	render(){
		const {display,action}=this.state
		const dispear=()=>this.setState({display:false,action:null})
		const {active, zIndex, width=256}=this.props
		return (
			<div style={{zIndex,
				position:"fixed",left:0,top:0,width:"100%",
				height:"100%", display:display ? "flex" : "none",
				flexDirection:"row"}}>
				<Paper zDepth={2} style={{width,height:"100%",backgroundColor:"white"}}>
						<center style={{zoom:2,marginTop:5}}>
							<Avatar backgroundColor={gray100}>
								<IconLogo color={yellow500}/>
							</Avatar>
						</center>

						<Menu width={width} autoWidth={!width}>
							<MenuItem
								primaryText="New"
								onClick={()=>this.setState({action:"create"})}
								/>
							<MenuItem
								primaryText="Open"
								onClick={()=>this.setState({action:"open"})}
								/>
							<MenuItem
								disabled={!active}
								primaryText="Save"
								onClick={()=>this.setState({action:"save"})}
								/>
							<MenuItem
								disabled={!active}
								primaryText="SaveAs"
								onClick={()=>this.setState({action:"saveAs"})}
								/>
							<Divider/>

							<MenuItem
								disabled={!active}
								primaryText="Print"
								onClick={()=>this.setState({action:"print"})}
								/>

							<MenuItem
								primaryText="Options"
								onClick={()=>this.setState({action:"options"})}
								/>

							<MenuItem
								primaryText="Close"
								/>

						</Menu>
				</Paper>
				<div style={{flex:"1 100%", backgroundColor:"lightgray",display:"flex",flexDirection:"column"}}>
				<div style={{flex:1, padding:10}}>
				{
					(function(action){
						if(!action)
							return null
						switch(action){
						case "create":
							return <Create
								onCancel={dispear}
								onCreate={dispear}
								/>
						case "save":
						case "saveAs":
							return <Save
								onCancel={dispear}
								onSave={dispear}
								/>
						case "options":
							return <OptionsUI/>
						case "open":
							return <Open
								onCancel={dispear}
								onLoad={dispear}
								/>
						case "print":
							return <Print
								doc={active}
								onCanncel={dispear}
								onPrint={dispear}
								/>
						}
					})(action)
				}
				</div>
				<div style={{flex:"1 100%", overflow:"scroll"}} onClick={dispear}></div>
				</div>
			</div>
		)
	}
}
