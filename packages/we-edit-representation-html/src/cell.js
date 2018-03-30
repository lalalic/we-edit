import React from "react"
import {models} from "we-edit"
const {Cell:Base}=models

export default class Cell extends Base{
	render(){
		return (
			<td style={{border:"1px solid gray"}}>{this.props.children}</td>
		)
	}
}
