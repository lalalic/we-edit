import React from "react"
import {dom} from "we-edit"
const {Cell:Base}=dom

export default class Cell extends Base{
	render(){
		return (
			<td style={{border:"1px solid gray"}}>{this.props.children}</td>
		)
	}
}
