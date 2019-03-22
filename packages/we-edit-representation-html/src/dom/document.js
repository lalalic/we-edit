import React,{Fragment} from "react"
import PropTypes from "prop-types"

import {dom} from "we-edit"
const {Document:Base}=dom

export default class Document extends Base{
	render(){
		const {canvas}=this.props
		const content=<article style={{whiteSpace:"pre-wrap"}}>{this.props.children}</article>
		return canvas ? React.cloneElement(canvas,{content}) : content
	}
}
