import React from "react"
import PropTypes from "prop-types"

import {models} from "we-edit"
const {Document:Base}=models

export default class Document extends Base{
	render(){
		return (
			<article>
				{this.props.children}
			</article>
		)
	}
}
