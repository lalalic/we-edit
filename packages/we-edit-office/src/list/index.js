import React, {Component} from "react"
import PropTypes from "prop-types"

import {compose,setDisplayName,getContext,mapProps} from "recompose"
import {connect} from "react-redux"
import {getSelection, ACTION} from "we-edit"

import {ToolbarGroup,MenuItem} from "material-ui"
import DropDownButton from "../components/drop-down-button"

import IconListBullet from "material-ui/svg-icons/editor/format-list-bulleted"
import IconListNumber from "material-ui/svg-icons/editor/format-list-numbered"

export default compose(
	setDisplayName("ParagraphStyle"),
	getContext({
		store:PropTypes.object,
		doc: PropTypes.object,
		selection: PropTypes.object
	}),
	mapProps(({doc, store, dispatch=store.dispatch, selection})=>{
		let style=selection ? selection.props("list") : null

		return {
			style,
			bullet: numFmt=>{
				dispatch(ACTION.Style.update({list:{numFmt}}))
			},
			number: numFmt=>{
				dispatch(ACTION.Style.update({list:{numFmt}}))
			}
		}
	}),
)(({children,style, bullet, number})=>(
	<ToolbarGroup>
		<DropDownButton
			status={!style ? "disabled" : style.format=="bullet" ?"checked":"unchecked"}
			onClick={()=>bullet("")}
			icon={<IconListBullet/>}
			>
			<MenuItem primaryText="bullet" onClick={e=>bullet(".")}/>
			<MenuItem primaryText="circle" onClick={e=>bullet("o")}/>
			
		</DropDownButton>
		<DropDownButton
			status={!style ? "disabled" : style.format!=="bullet" ?"checked":"unchecked"}
			onClick={()=>bullet("")}
			icon={<IconListNumber/>}
			>
			<MenuItem primaryText="1." onClick={e=>numbering("decimal")}/>
			<MenuItem primaryText="a." onClick={e=>numbering("lowerLetter")}/>
			<MenuItem primaryText="一" onClick={e=>numbering("chinese")}/>
		</DropDownButton>	
		{children}
	</ToolbarGroup>
))