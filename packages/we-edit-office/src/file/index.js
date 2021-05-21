import React, {Component, Fragment} from "react"
import PropTypes from "prop-types"
import IconSave from "material-ui/svg-icons/content/save"
import IconRefresh from "material-ui/svg-icons/navigation/refresh"

import {ACTION} from "we-edit"

import Save from "./save"
import CheckIconButton from "../components/check-icon-button"

export default class File extends Component{
	static contextTypes={
		store: PropTypes.object,
	}
	shouldComponentUpdate(){
		return false
	}
	
	render(){
		const {children}=this.props
		return (
			<Fragment>
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
			</Fragment>
		)
	}
}

export {default as Save} from "./save"
export {default as Open} from "./open"
export {default as Create} from "./create"
export {default as Print} from "./print"
