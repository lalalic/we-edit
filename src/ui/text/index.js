import React, {Component} from "react"
import PropTypes from "prop-types"

import selector from "we-edit/state/selector"

import {compose,setDisplayName} from "recompose"
import {connect} from "react-redux"

import {ToolbarGroup} from "material-ui"
import {IconButton} from "we-edit-ui/components/with-no-doc"
import IconBold from "material-ui/svg-icons/editor/format-bold"
import IconItalic from "material-ui/svg-icons/editor/format-italic"
import IconUnderlined from "material-ui/svg-icons/editor/format-underlined"

export default compose(
	setDisplayName("TextStyle"),
	connect(({selection})=>{
		let applicable=selection.isApplicable("text")
		if(!applicable)
			return {applicable}
		let style=selection.getStyle("text")
		return {style}
	}),
)(({style})=>(
	<ToolbarGroup>
		<IconButton
			disabled={style.bold}
			children={<IconBold/>}
			/>
		<IconButton
			disabled={style.italic}
			children={<IconItalic/>}
			/>
		<IconButton
			disabled={style.underlined}
			children={<IconUnderlined/>}
			/>
	</ToolbarGroup>
))
