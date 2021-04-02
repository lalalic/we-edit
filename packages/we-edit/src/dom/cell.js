import PropTypes from "prop-types"

import Component from "./component"

export default class Cell extends Component{
	static displayName="cell"
	static propTypes={
		border:this.BorderShape,
		margin: this.MarginShape,
		fill: this.FillShape,
		vertAlign: this.VertAlignShape,
	}

	static defaultProps={
		border:this.BorderShape.default,
		margin:this.MarginShape.default,
	}
}
