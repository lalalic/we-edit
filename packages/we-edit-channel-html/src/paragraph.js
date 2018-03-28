import React from "react"
import {models} from "we-edit"
const {Paragraph:Base}=models

export default class Paragraph extends Base{
	render(){
		return (
			<p>{this.props.children}</p>
		)
	}
}
