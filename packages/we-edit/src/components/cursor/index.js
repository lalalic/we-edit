import React, {Component,Fragment} from "react"
import {createPortal} from "react-dom"

import Flash from "./flash"
import Input from "./input"

import { Workers } from "./workers"

export default class Cursor extends Component{
	input=React.createRef()
	render(){
		const {children:cursorShape, workerShape, ...props}=this.props

		return (
			<Fragment>
				{createPortal(
					<Input {...props} inputRef={this.input} hasCursorShape={!!cursorShape}/>,
					document.body
				)}
				{cursorShape && <Flash input={this.input}>{React.cloneElement(cursorShape, props)}</Flash>}
				{workerShape && <Workers shape={workerShape}/>}
			</Fragment>
		)
	}
}


