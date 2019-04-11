import React from "react"
import PropTypes from "prop-types"

import Component from "./component"


export default class Paragraph extends Component{
	static displayName="paragraph"
	static propTypes={
		spacing: PropTypes.shape({
			lineHeight:PropTypes.oneOfType([PropTypes.string,PropTypes.number]),
			top:PropTypes.number,
			bottom:PropTypes.number
		}).isRequired,
		indent: PropTypes.shape({
			left:PropTypes.number,
			right:PropTypes.number,
			firstLine:PropTypes.number
		}).isRequired,
		align:PropTypes.string,
		numbering: PropTypes.shape({
			style: PropTypes.shape({
				fonts:PropTypes.string.isRequired,
				size:PropTypes.number.isRequired,
				bold: PropTypes.bool,
				italic: PropTypes.bool,
			}).isRequired,
			label: PropTypes.string.isRequired,
		}),
		defaultStyle:PropTypes.shape({
			fonts:PropTypes.string.isRequired,
			size:PropTypes.number.isRequired,
			bold: PropTypes.bool,
			italic: PropTypes.bool,
		}),
		widow:PropTypes.bool,
		orphan: PropTypes.bool,
		keepLines: PropTypes.bool,
		keepWithNext: PropTypes.bool,
		End:PropTypes.string,
	}

	static defaultProps={
		spacing:{},
		indent:{},
		widow:true,
		orphan:true,
		End:String.fromCharCode(0xb6),
	}

	static contextTypes={
		isAnchored: PropTypes.func,
		exclusive: PropTypes.func,
	}
}
