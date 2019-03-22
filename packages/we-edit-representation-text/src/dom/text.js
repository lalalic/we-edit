import React from "react"
import {dom} from  "we-edit"

export default class extends dom.Paragraph{
	render(){
		return this.props.children
	}
}