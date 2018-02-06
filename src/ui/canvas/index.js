import React, {PureComponent} from "react"

import Ruler from "we-edit-ui/ruler"
import Status from "we-edit-ui/status"

export default class Canvas extends PureComponent{
	render(){
		const {doc,children}=this.props
		return (
			<div style={{position:"relative"}}>
				{children}
				<Ruler style={{position:"absolute",top:0,left:0}}/>
				<Status/>
			</div>
		)
	}
}
