import React, {Component} from "react"
import PropTypes from "prop-types"
import {connect} from "react-redux"
import {compose,mapProps,getContext,setDisplayName}  from "recompose"

import {Drawer,Menu, MenuItem, Avatar,Paper} from "material-ui"
import Divider from 'material-ui/Divider';
import {yellow500, gray100} from 'material-ui/styles/colors';

import IconLogo from "material-ui/svg-icons/editor/border-color"
import {getActive} from "we-edit"
import * as File from "../file"

export default compose(
	setDisplayName("dashboard"),
	connect(state=>({activeDoc:(getActive(state)||{}).doc})),
	mapProps(({dispatch, activeDoc, dispear})=>({
		create:File.create(dispatch),
		open:File.open(dispatch),
		dispear,
		activeDoc,
	})),
)(({open, create, dispear, activeDoc})=>(
	<div style={{position:"fixed",left:0,top:0,width:"100%",height:"100%", display:"flex", flexDirection:"row"}}>
		<Paper style={{flex:1, width:200,height:"100%", backgroundColor:"white"}}>
				<center style={{zoom:2,marginTop:5}}>
					<Avatar backgroundColor={gray100}>
						<IconLogo color={yellow500}/>
					</Avatar>
				</center>

				<Menu>
					<MenuItem
						primaryText="New"
						onClick={()=>Promise.resolve(create()).then(dispear,dispear)}
						/>
					<MenuItem
						primaryText="Open"
						onClick={()=>Promise.resolve(open()).then(dispear,dispear)}
						/>
					<MenuItem
						disabled={!activeDoc}
						primaryText="Save"
						/>
					<MenuItem
						disabled={!activeDoc}
						primaryText="SaveAs"
						/>
					<Divider/>

					<MenuItem
						disabled={!activeDoc}
						primaryText="Print"
						/>

					<MenuItem
						disabled={!activeDoc}
						primaryText="Print Preview"
						/>

					<MenuItem
						primaryText="Options"
						/>

					<MenuItem
						primaryText="Close"
						/>

				</Menu>
		</Paper>
		<div style={{flex:"1 100%"}} onClick={dispear}>
			<div style={{position:"absolute",width:"100%",height:"100%",backgroundColor:"black",opacity:"0.5"}}/>
			<div>hello</div>

		</div>
	</div>
))
