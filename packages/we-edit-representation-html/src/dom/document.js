import React from "react"

import {dom} from "we-edit"
const {Document:Base}=dom

export default class Document extends Base{
	render(){
		const {canvas}=this.props
		return React.cloneElement(canvas,{
			content:<article style={{whiteSpace:"pre-wrap",textAlign:"initial"}}>{this.props.children}</article>
		})
	}
}