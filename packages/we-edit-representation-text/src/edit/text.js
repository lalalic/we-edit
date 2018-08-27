import React from "react"
import {models} from  "we-edit"

export default class extends models.Paragraph{
	render(){
		return <span>{this.props.children}</span>
	}
}