import React, {Component} from "react"
import PropTypes from "prop-types"

import {ToolbarGroup, ToolbarSeparator, ToolbarTitle,IconButton, } from "material-ui"

import IconBold from "material-ui/svg-icons/editor/format-bold"
import IconItalic from "material-ui/svg-icons/editor/format-italic"
import IconUnderlined from "material-ui/svg-icons/editor/format-underlined"

export default class Text extends Component{
	render(){
		return (
			<ToolbarGroup>
				<IconButton><IconBold/></IconButton>
				<IconButton><IconItalic/></IconButton>
				<IconButton><IconUnderlined/></IconButton>
			</ToolbarGroup>
		)
	}
}