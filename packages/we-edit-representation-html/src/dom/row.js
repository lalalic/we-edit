import React from "react"
import {dom} from "we-edit"
const {Row:Base}=dom

export default class Row extends Base{
	render(){
		return (
			<tr>{this.props.children}</tr>
		)
	}
}
