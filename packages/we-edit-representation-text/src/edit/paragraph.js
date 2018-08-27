import React,{Component, Fragment} from "react"
import PropTypes  from "prop-types"

import {models} from "we-edit"

export default class extends models.Paragraph{
	render(){
		return (
			<p>{this.props.children}</p>
		)
	}
}