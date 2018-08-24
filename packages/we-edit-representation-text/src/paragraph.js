import React,{Fragment} from "react"
import {models} from  "we-edit"

export default class extends models.Paragraph{
	render(){
		return (<Fragment>{this.props.children}{"\r\n"}</Fragment>)
	}
}