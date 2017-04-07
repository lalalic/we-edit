import React from "react"
import Base from "../row"

export default class Row extends Base{
	render(){
		return (
			<tr>{this.props.children}</tr>
		)
	}
}