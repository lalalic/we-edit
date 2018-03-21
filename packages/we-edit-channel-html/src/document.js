import React from "react"
import PropTypes from "prop-types"

import Base from "we-edit/model/document"

export default class Document extends Base{
	render(){
		return (
			<article>
				{this.props.children}
			</article>
		)
	}
}
