import React from "react"

import {connect} from "react-redux"
import {compose, setDisplayName, onlyUpdateForKeys} from "recompose"

import {ToolbarGroup} from "material-ui"
import CheckIconButton from "../components/check-icon-button"
import ContextMenu from "../components/context-menu"


import IconCopy from "material-ui/svg-icons/content/content-copy"
import IconPaste from "material-ui/svg-icons/content/content-paste"
import IconCut from "material-ui/svg-icons/content/content-cut"


import {ACTION, getSelection, getActive} from "we-edit"

export default compose(
	setDisplayName("clipboard"),
	connect(state=>{
		state=getActive(state).state
		const {start={},end={}}=getSelection(state)
		const isCursor=start.id==end.id && start.at==end.at
        return {
			withSelection: !isCursor,
            withClipboard:!!window._clipboard,
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
	}),
	onlyUpdateForKeys(['withSelection','withClipboard']),
)(({cut,copy,paste,withSelection,withClipboard,children})=>(
	<ContextMenu.Support>
		<ToolbarGroup>
			<CheckIconButton
				shortcut="&#8984;B"
				label="Paste"
				status={withClipboard ? "uncheck" : "disabled"}
				children={<IconPaste/>}
				onClick={paste}
				/>
			<CheckIconButton
				label="Cut"
				status={withSelection ? "uncheck" : "disabled"}
				children={<IconCut/>}
				onClick={cut}
				/>
			<CheckIconButton
				label="Copy"
				status={withSelection ? "uncheck" : "disabled"}
				children={<IconCopy/>}
				onClick={copy}
				/>
			{children}
		</ToolbarGroup>
	</ContextMenu.Support>
))
