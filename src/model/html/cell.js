import React from "react"
import Base from "../cell"

export default class Cell extends Base{
	render(){
		return (
			<td style={{border:"1px solid gray"}}>{this.props.children}</td>
		)
	}
}