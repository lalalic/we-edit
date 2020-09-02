import PropTypes from "prop-types"

import Component from "./component"

export default class Cell extends Component{
	static displayName="cell"
	static propTypes={
		border:this.BorderShape,
		margin: this.MarginShape,
		background: PropTypes.string,
		vertAlign: PropTypes.oneOf(["top","middle","center","bottom"])
	}

	static defaultProps={
		border:{
			left:this.DefaultLine,
			right:this.DefaultLine,
			top:this.DefaultLine,
			bottom:this.DefaultLine
		},
		margin:{
			left:0,
			right:0,
			top:0,
			bottom:0
		},
		background:"transparent"
	}
}
