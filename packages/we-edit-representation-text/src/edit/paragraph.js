import React, {Component} from "react"
import {Editors} from  "we-edit-representation-pagination"


export default class Paragraph extends Component{
	render(){
		let {id,children}=this.props
		return (<Editors.Paragraph {...{lineHeight:"140%",children,id}}/>)
	}
}