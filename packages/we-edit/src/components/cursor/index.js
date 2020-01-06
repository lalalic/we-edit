import React, {Component,Fragment} from "react"
import {createPortal} from "react-dom"

import Flash from "./flash"
import Input from "./input"

export default class Cursor extends Component{
	input=React.createRef()
	render(){
		const {children:cusorShape, ...props}=this.props

		return (
			<Fragment>
				{createPortal(
					<Input {...props} inputRef={this.input} hasCursorShape={!!cusorShape}/>,
					document.body
				)}
				{cusorShape && <Flash input={this.input}>{React.cloneElement(cusorShape, props)}</Flash>}
			</Fragment>
		)
	}
}
