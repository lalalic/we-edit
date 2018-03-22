import React from "react"
import {Paragraph as Base} from "we-edit/model"

export default class Paragraph extends Base{
	render(){
		return (
			<p>{this.props.children}</p>
		)
	}
}
