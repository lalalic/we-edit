import React,{Fragment} from "react"
import PropTypes from "prop-types"

import {dom} from "we-edit"
const {Document:Base}=dom

export default class Document extends Base{
	render(){
		const {canvas=<Dummy/>}=this.props
		return React.cloneElement(canvas,{
			content:<article style={{whiteSpace:"pre-wrap"}}>{this.props.children}</article>
		})
	}
}
const Dummy=({content})=>content
