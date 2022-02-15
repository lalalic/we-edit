import React from "react"
import PropTypes from "prop-types"

import Component from "./component"

export default class Text extends Component{
	static displayName="text"
	static propTypes=this.TextStyleShape.Type.props.schema
	static LineBreak=String.fromCharCode(13)
	static LineFeed=String.fromCharCode(10)
	static Tab=String.fromCharCode(9)
	static FormFeed=String.fromCharCode(12)
	static PageBreak=String.fromCharCode(12)
}
