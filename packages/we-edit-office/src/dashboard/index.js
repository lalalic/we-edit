import React, {Component} from "react"
import PropTypes from "prop-types"
import {connect} from "react-redux"
import {compose,mapProps,getContext,setDisplayName}  from "recompose"

import {Drawer,Menu, MenuItem, Avatar} from "material-ui"
import Divider from 'material-ui/Divider';
import {yellow500, gray100} from 'material-ui/styles/colors';

import IconLogo from "material-ui/svg-icons/editor/border-color"
import * as File from "../file"

export default compose(
	setDisplayName("dashboard"),
	getContext({store:PropTypes.object}),
	mapProps(({store:{dispatch}, dispear})=>({
		create:File.create(dispatch),
		open:File.open(dispatch),
		dispear,
	})),
)(({open, create, dispear})=>(
	<Drawer
		docked={false}
		open={true}
		onRequestChange={dispear}>
		
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
				primaryText="Save"
				/>
			<MenuItem
				primaryText="SaveAs"
				/>
			<Divider/>

			<MenuItem
				primaryText="Print"
				/>

			<MenuItem
				primaryText="Print Preview"
				/>

			<MenuItem
				primaryText="Options"
				/>

			<MenuItem
				primaryText="Close"
				/>

		</Menu>
	</Drawer>
))
