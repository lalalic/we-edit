import React from "react"
import {models} from  "we-edit"

export default class extends models.Paragraph{
	render(){
		return this.props.children
	}
}