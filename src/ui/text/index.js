import React, {Component} from "react"
import PropTypes from "prop-types"

import selector from "we-edit/state/selector"

import {compose,setDisplayName,getContext,mapProps} from "recompose"
import {connect} from "react-redux"

import {ToolbarGroup} from "material-ui"
import {IconButton} from "we-edit-ui/components/with-no-doc"
import IconBold from "material-ui/svg-icons/editor/format-bold"
import IconItalic from "material-ui/svg-icons/editor/format-italic"
import IconUnderlined from "material-ui/svg-icons/editor/format-underlined"

export default compose(
	setDisplayName("TextStyle"),
	getContext({store:PropTypes.object}),
	mapProps(({store:{dispatch}})=>({
		toggleB:()=>dispatch(ACTION.text.toggle("b")),
		toggleI:()=>dispatch(ACTION.text.toggle("i")),
		toggleU:()=>dispatch(ACTION.text.toggle("u")),
	})),
	connect(({selection})=>{
		if(!selection)
			return {}
		let applicable=selection.isApplicable("text")
		if(!applicable)
			return {applicable}
		let style=selection.getStyle("text")
		return {style}
	}),
)(({style={}, toggleB, toggleI, toggleU})=>(
	<ToolbarGroup>
		<IconButton
			disabled={style.bold}
			onClick={toggleB}
			children={<IconBold/>}
			/>
		<IconButton
			disabled={style.italic}
			onClick={toggleI}
			children={<IconItalic/>}
			/>
		<IconButton
			disabled={style.underlined}
			onClick={toggleU}
			children={<IconUnderlined/>}
			/>
	</ToolbarGroup>
))
