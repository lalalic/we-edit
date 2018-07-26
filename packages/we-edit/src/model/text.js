import React from "react"
import PropTypes from "prop-types"

import Component from "./component"

export default class Text extends Component{
	static displayName="text"
	static propTypes={
		fonts: PropTypes.string,
		size: PropTypes.number,
		color: PropTypes.string,
		bold: PropTypes.bool,
		italic: PropTypes.bool,
		vanish: PropTypes.bool,
		hightlight: PropTypes.string,
		border: PropTypes.object,
		underline: PropTypes.string,
		strike: PropTypes.bool,
	}
	
	static defaultProps={
		size:11
	}
}
