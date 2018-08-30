import React, {Component} from "react"
import {Editors} from  "we-edit-representation-html"


export default class Paragraph extends Component{
	render(){
		let {id,children, changed, selfChanged}=this.props
		return (<Editors.Paragraph {...{spacing:{lineHeight:"140%"},children,id,changed,selfChanged}}/>)
	}
}