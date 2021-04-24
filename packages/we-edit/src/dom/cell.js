import PropTypes from "prop-types"

import Component from "./component"

/**
 * Cell is like Section, so follow Section structure
 */
export default class Cell extends Component{
	static displayName="cell"
	static propTypes={
		border:this.BorderShape,
		margin: this.MarginShape,
		fill: this.FillShape,
		vertAlign: this.VertAlignShape,
		rowSpan: PropTypes.number,
		colSpan: PropTypes.number,
	}

	static defaultProps={
		border:this.BorderShape.default,
		margin:this.MarginShape.default,
	}
}
