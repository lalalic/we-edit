import React from "react"
import PropTypes from "prop-types"

import Component from "./component"

export default class Row extends Component{
	static displayName="row"
	static propTypes={
		height: this.UnitShape,
		minHeight: this.UnitShape,
		keepLines: PropTypes.bool,
		header: PropTypes.bool,
		footer: PropTypes.bool,
	}

	static contextTypes={
		cols:PropTypes.oneOfType([
			PropTypes.arrayOf(PropTypes.shape({
				x: this.UnitShape,
				width:this.UnitShape
			})),
			PropTypes.func
		])
	}
}
