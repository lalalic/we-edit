import React, {Component} from "react"
import PropTypes from "prop-types"
import {connect} from "react-redux"
import {compose, mapProps,getContext,setDisplayName} from "recompose"

import {ToolbarGroup} from "material-ui"
import CheckIconButton from "../components/check-icon-button"


import IconCopy from "material-ui/svg-icons/content/content-copy"
import IconPaste from "material-ui/svg-icons/content/content-paste"
import IconCut from "material-ui/svg-icons/content/content-cut"


import {ACTION, getSelection, getActive} from "we-edit"

export default compose(
	setDisplayName("clipboard"),
	connect(state=>{
		state=getActive(state).state
        const {start={},end={}}=getSelection(state)
        return {
            withSelection:start.id==end.id && start.at==end.at,
            withClipboard:true,
		}
	},(dispatch)=>{
		return {
            cut(){
                dispatch(ACTION.Selection.CUT())
            },
			copy(){
				dispatch(ACTION.Selection.COPY())
			},
			paste(){
				dispatch(ACTION.Selection.PASTE())
			},
		}
	})
)(({cut,copy,paste,withSelection,withClipboard,children})=>(
	<ToolbarGroup>
		<CheckIconButton
			status={withClipboard ? "uncheck" : "disabled"}
			children={<IconPaste/>}
			onClick={paste}
			/>
		<CheckIconButton
			status={withSelection ? "uncheck" : "disabled"}
			children={<IconCut/>}
			onClick={cut}
			/>
        <CheckIconButton
			status={withSelection ? "uncheck" : "disabled"}
			children={<IconCopy/>}
			onClick={copy}
			/>
		{children}
	</ToolbarGroup>
))
