import React from "react"
import PropTypes from "prop-types"

import Component from "./component"

export default class Text extends Component{
	static displayName="text"
	static propTypes={
		fonts: this.FontsShape.isRequired,
		size: this.UnitShape.isRequired,
		
		bold: PropTypes.bool,
		italic: PropTypes.bool,
		vanish: PropTypes.bool,

		border: PropTypes.oneOfType([
			PropTypes.bool,
			this.BorderShape,
		]),
		underline: PropTypes.oneOfType([
			PropTypes.bool,
			this.LineShape,
		]),
		strike: PropTypes.oneOfType([
			PropTypes.bool,
			this.LineShape,
		]),
		vertAlign: PropTypes.oneOf(["subscript","superscript"],{label:"vertical alignment"}),
		highlight: this.ColorShape,
		color: this.ColorShape,

		formatText: PropTypes.func,//caps, dynamic, ...

		scale:PropTypes.shape({
			horizontal: this.UnitShape,
			vertical: this.UnitShape,
		}),
		spacing: this.UnitShape,
		position: this.UnitShape,
		kerning: PropTypes.oneOfType([
			PropTypes.bool,
			this.UnitShape,
		]),
		emphasizeMark: PropTypes.string,
	}
	static LineBreak=String.fromCharCode(13)
	static LineFeed=String.fromCharCode(10)
	static Tab=String.fromCharCode(9)
	static FormFeed=String.fromCharCode(12)
	static PageBreak=String.fromCharCode(12)
}
