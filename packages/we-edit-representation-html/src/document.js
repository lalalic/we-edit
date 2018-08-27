import React,{Fragment} from "react"
import PropTypes from "prop-types"

import {models} from "we-edit"
const {Document:Base}=models

export default class Document extends Base{
	render(){
		const {canvas,scale}=this.props
		const content=<article style={{whiteSpace:"pre-wrap"}}>{this.props.children}</article>
		if(canvas){
			return React.cloneElement(canvas,{scale,content})
		}else{
			return content
		}
	}
}
