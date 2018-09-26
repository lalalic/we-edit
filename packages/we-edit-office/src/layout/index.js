import React,  {PureComponent} from "react"
import PropTypes from "prop-types"
import {compose, getContext, mapProps} from "recompose"

import {ToolbarGroup} from "material-ui"
import IconBreaks from "material-ui/svg-icons/editor/insert-photo"
import IconMargins from "material-ui/svg-icons/editor/insert-photo"
import IconOrientation from "material-ui/svg-icons/editor/insert-photo"
import IconSize from "material-ui/svg-icons/editor/insert-photo"
import IconColumns from "material-ui/svg-icons/editor/insert-photo"

import MenuItem from 'material-ui/MenuItem'
import Subheader from 'material-ui/Subheader'
import DropDownButton from "../components/drop-down-button"

import {ACTION} from "we-edit"

export const Tools=compose(
	mapProps(({children,dispatch})=>{
		return {
			children,
			createSection(props={}){
				dispatch(ACTION.Entity.CREATE({...props,type:"section",}))
			}
		}
	}),
)(({children, createSection})=>{
	return (
		<ToolbarGroup>			
			<DropDownButton 
				label="Breaks"
				icon={<IconBreaks/>}>
				<Subheader>Page Breaks</Subheader>
				<MenuItem primaryText="Page" />
				<MenuItem primaryText="Column" />
				<MenuItem primaryText="Text Wrapping" />
				<Subheader>Section Breaks</Subheader>
				<MenuItem 
					primaryText="Next Page" 
					//secondaryText="Insert a section break and start new section from new page"
					onClick={e=>createSection()}
					/>
				<MenuItem primaryText="Continuous" onClick={e=>createSection({kind:"continuous"})}/>
				<MenuItem primaryText="Even Page" onClick={e=>createSection({kind:"evenPage"})}/>
				<MenuItem primaryText="Odd Page" onClick={e=>createSection({kind:"oddPage"})}/>		
			</DropDownButton>
			
			<DropDownButton 
				label="Margins"
				icon={<IconMargins/>}>
				<MenuItem primaryText="Normal" />
				<MenuItem primaryText="Narrow" />
				<MenuItem primaryText="Moderate" />
				<MenuItem primaryText="Wide" />
				<MenuItem primaryText="Mirrored" />	
				<MenuItem primaryText="Custom Margins..." />					
			</DropDownButton>
			
			<DropDownButton 
				label="Orientation"
				icon={<IconOrientation/>}>
				<MenuItem primaryText="Portrait" />
				<MenuItem primaryText="Landscape" />
			</DropDownButton>
			
			<DropDownButton 
				label="Size"
				icon={<IconSize/>}>
				<MenuItem primaryText="Letter" />
				<MenuItem primaryText="Legal" />
				<MenuItem primaryText="A3" />
				<MenuItem primaryText="A4" />
				<MenuItem primaryText="A5" />
				<MenuItem primaryText="B4" />
				<MenuItem primaryText="B5" />
				<MenuItem primaryText="More Paper Sizes..." />
			</DropDownButton>
			
			<DropDownButton 
				label="Columns"
				icon={<IconColumns/>}>
				<MenuItem primaryText="1" />
				<MenuItem primaryText="2" />
				<MenuItem primaryText="3" />
				<MenuItem primaryText="Left" />	
				<MenuItem primaryText="Right" />
				<MenuItem primaryText="More Columns..." />					
			</DropDownButton>
			{children}
		</ToolbarGroup>
	)
})

