import React,  {} from "react"
import PropTypes from "prop-types"
import {ToolbarGroup} from "material-ui"
import IconPicture from "material-ui/svg-icons/editor/insert-photo"
import IconOnlinePicture from "material-ui/svg-icons/editor/insert-chart"

import SizeIconButton from "../components/size-icon-button"
export {default as Ribbon} from "./ribbon"

export const Tools=({style, selection, children, getUrl, selectFile})=>{
	return (
		<ToolbarGroup>
			<SizeIconButton>
				<IconPicture/>
			</SizeIconButton>
			<SizeIconButton>
				<IconOnlinePicture/>
			</SizeIconButton>
			{children}
		</ToolbarGroup>
	)
}