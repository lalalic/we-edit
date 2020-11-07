import React from "react"
import PropTypes from "prop-types"

import Component from "./component"

export default class Text extends Component{
	static displayName="text"
	static propTypes={
		fonts: PropTypes.string.isRequired,
		size: PropTypes.number.isRequired,
		color: PropTypes.string,
		bold: PropTypes.bool,
		italic: PropTypes.bool,
		vanish: PropTypes.bool,
		highlight: PropTypes.string,
		border: PropTypes.object,
		underline: PropTypes.string,
		strike: PropTypes.bool,
		vertAlign: PropTypes.oneOf(["subscript","superscript"]),
		displayText: PropTypes.string,
	}
	static LineBreak=String.fromCharCode(13)
	static LineFeed=String.fromCharCode(10)
	static Tab=String.fromCharCode(9)
	static FormFeed=String.fromCharCode(12)
	static PageBreak=String.fromCharCode(12)
}
