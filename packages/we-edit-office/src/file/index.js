import React, {PureComponent} from "react"
import PropTypes from "prop-types"
import {ToolbarGroup} from "material-ui"
import IconSave from "material-ui/svg-icons/content/save"
import IconRefresh from "material-ui/svg-icons/navigation/refresh"

import {getActive, ACTION} from "we-edit"

import Save from "./save"
import CheckIconButton from "../components/check-icon-button"

export default class File extends PureComponent{
	static contextTypes={
		store: PropTypes.object,
	}

	render(){
		const {children}=this.props
		return (
			<ToolbarGroup>
				<CheckIconButton
					status="unchecked"
					hint="refresh"
					onClick={e=>{
						this.context.store.dispatch(ACTION.Refresh())
					}}>
					<IconRefresh/>
				</CheckIconButton>
				<CheckIconButton
					status="unchecked"
					hint="save"
					onClick={e=>{
						Save.save(this.context.store)({})
					}}>
					<IconSave/>
				</CheckIconButton>
				{children}
			</ToolbarGroup>
		)
	}
}

export {default as Save} from "./save"
export {default as Open} from "./open"
export {default as Create} from "./create"
export {default as Print} from "./print"
