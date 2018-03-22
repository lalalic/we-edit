import React from "react"
import {Row as Base} from "we-edit/model"

export default class Row extends Base{
	render(){
		return (
			<tr>{this.props.children}</tr>
		)
	}
}
