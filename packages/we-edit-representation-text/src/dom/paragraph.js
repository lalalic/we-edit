import React,{Fragment} from "react"
import {dom} from  "we-edit"

export default class extends dom.Paragraph{
	render(){
		return (<Fragment>{this.props.children}{"\r\n"}</Fragment>)
	}
}