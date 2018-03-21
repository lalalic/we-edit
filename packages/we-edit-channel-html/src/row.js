import React from "react"
import Base from "we-edit/model/row"

export default class Row extends Base{
	render(){
		return (
			<tr>{this.props.children}</tr>
		)
	}
}
