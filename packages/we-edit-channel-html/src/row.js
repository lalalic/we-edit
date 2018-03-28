import React from "react"
import {models} from "we-edit"
const {Row:Base}=models

export default class Row extends Base{
	render(){
		return (
			<tr>{this.props.children}</tr>
		)
	}
}
