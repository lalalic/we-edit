import React, {Component} from "react"
import PropTypes from "prop-types"

import {compose,setDisplayName} from "recompose"
import {connect} from "react-redux"

import {ToolbarGroup} from "material-ui"
import {IconButton} from "we-edit-ui/components/with-no-doc"

import IconAlignCenter from "material-ui/svg-icons/editor/format-align-center"
import IconAlignLeft from "material-ui/svg-icons/editor/format-align-left"
import IconAlignRight from "material-ui/svg-icons/editor/format-align-right"

export default compose(
	setDisplayName("ParagraphStyle"),
	connect(({})=>({

	}))
)(({})=>(
	<ToolbarGroup>
		<IconButton
			children={<IconAlignLeft/>}
			/>
		<IconButton
			children={<IconAlignCenter/>}
			/>
		<IconButton
			children={<IconAlignRight/>}
			/>
	</ToolbarGroup>
))
