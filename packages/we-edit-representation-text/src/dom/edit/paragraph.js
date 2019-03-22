import React, {Component} from "react"
import PropTypes from "prop-types"
import {Editors} from  "we-edit-representation-html"


export default class Paragraph extends Component{
	static contextTypes={
		lineHeight: PropTypes.string
	}
	render(){
		let {id,children, changed, selfChanged}=this.props
		let {lineHeight="140%"}=this.context
		return (<Editors.Paragraph {...{spacing:{lineHeight},children,id,changed,selfChanged}}/>)
	}
}
