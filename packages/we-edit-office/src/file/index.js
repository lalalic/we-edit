import React, {PureComponent} from "react"
import PropTypes from "prop-types"
import {ToolbarGroup} from "material-ui"
import IconSave from "material-ui/svg-icons/content/save"

import {getActive} from "we-edit"

import Save from "./save"
import CheckIconButton from "../components/check-icon-button"

export default class File extends PureComponent{
	static contextTypes={
		doc: PropTypes.object,
		store: PropTypes.object,
	}

	render(){
		const {children}=this.props
		const {store,doc}=this.context
		return (
			<ToolbarGroup>
				<CheckIconButton
					status="unchecked"
					onClick={()=>Save.save(getActive(store.getState()),doc)({})}>
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
