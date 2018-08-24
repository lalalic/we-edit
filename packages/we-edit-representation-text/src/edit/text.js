import React from "react"
import {models} from  "we-edit"

export default class extends models.Paragraph{
	render(){
		return <span {...{"data-content":this.props.id,"data-type":"text"}}>{this.props.children}</span>
	}
}