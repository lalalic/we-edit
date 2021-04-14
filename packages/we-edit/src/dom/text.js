import React from "react"
import PropTypes from "prop-types"

import Component from "./component"

export default class Text extends Component{
	static displayName="text"
	static propTypes={
		/**
		 * "Arial", or {cs,ea,ascii,hansi,[7F-FF,...]}
		 */
		fonts: this.FontsShape.isRequired,
		size: this.UnitShape.isRequired,
		color: this.ColorShape,
		bold: PropTypes.bool,
		italic: PropTypes.bool,
		vanish: PropTypes.bool,
		highlight: this.ColorShape,
		border: this.BorderShape,
		underline: PropTypes.oneOfType([
			PropTypes.bool,
			this.LineShape,
		]),
		strike: PropTypes.bool,
		vertAlign: PropTypes.oneOf(["subscript","superscript"]),
	}
	static LineBreak=String.fromCharCode(13)
	static LineFeed=String.fromCharCode(10)
	static Tab=String.fromCharCode(9)
	static FormFeed=String.fromCharCode(12)
	static PageBreak=String.fromCharCode(12)
}
