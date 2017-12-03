import React, {Component} from "react"
import PropTypes from "prop-types"
import {connect} from "react-redux"
import {compose,mapProps,getContext,setDisplayName}  from "recompose"

import {Drawer,Menu, MenuItem, Avatar} from "material-ui"
import Divider from 'material-ui/Divider';
import {yellow500, gray100} from 'material-ui/styles/colors';

import {IconButton} from "we-edit-ui/components/with-no-doc"

import IconLogo from "material-ui/svg-icons/editor/border-color"
import * as File from "we-edit-ui/file"

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
			<Divider/>

			<MenuItem
				primaryText="Print"
				onClick={()=>Promise.resolve(open()).then(dispear,dispear)}
				/>

			<MenuItem
				primaryText="Print Preview"
				onClick={()=>Promise.resolve(open()).then(dispear,dispear)}
				/>

			<MenuItem
				primaryText="Options"
				onClick={()=>Promise.resolve(open()).then(dispear,dispear)}
				/>
				
			<MenuItem
				primaryText="Close"
				onClick={()=>Promise.resolve(open()).then(dispear,dispear)}
				/>

		</Menu>
	</Drawer>
))
