import React from "react"
import {Cell as Base} from "we-edit/model"

export default class Cell extends Base{
	render(){
		return (
			<td style={{border:"1px solid gray"}}>{this.props.children}</td>
		)
	}
}
