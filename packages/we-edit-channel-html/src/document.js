import React from "react"
import PropTypes from "prop-types"

import {Document as Base} from "we-edit/model"

export default class Document extends Base{
	render(){
		return (
			<article>
				{this.props.children}
			</article>
		)
	}
}
