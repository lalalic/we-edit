import React,{Fragment} from "react"
import PropTypes from "prop-types"

import {models} from "we-edit"
const {Document:Base}=models

export default class Document extends Base{
	render(){
		const {canvas=<Fragment/>,scale}=this.props
		return React.cloneElement(
			canvas,
			{scale},
			<article>{this.props.children}</article>
		)
	}
}
