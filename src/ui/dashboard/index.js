import React, {Component} from "react"
import PropTypes from "prop-types"
import {connect} from "react-redux"
import {compose,mapProps,getContext,setDisplayName}  from "recompose"

import {Drawer,MenuItem} from "material-ui"
import {IconButton} from "we-edit-ui/with-no-doc"

import IconOpen from "material-ui/svg-icons/file/folder-open"
import IconCreate from "material-ui/svg-icons/content/create"

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
		<MenuItem>
			<IconButton onClick={()=>{
				Promise.resolve(create())
					.then(dispear,dispear)
			}}>
				<IconCreate/>
			</IconButton>
		</MenuItem>
		<MenuItem>
			<IconButton onClick={()=>{
				Promise.resolve(open())
					.then(dispear,dispear)
			}}>
				<IconOpen/>
			</IconButton>
		</MenuItem>
	</Drawer>
))