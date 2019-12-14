import PropTypes from "prop-types"

import Component from "./component"

const {LineShape,DefaultLine}=Component

export default class Cell extends Component{
	static displayName="cell"
	static propTypes={
		border:PropTypes.shape({
			left:PropTypes.shape(LineShape),
			right:PropTypes.shape(LineShape),
			top:PropTypes.shape(LineShape),
			bottom:PropTypes.shape(LineShape),
		}),
		margin: PropTypes.shape({
			left: PropTypes.number,
			right: PropTypes.number,
			top: PropTypes.number,
			bottom: PropTypes.number
		}),
		background: PropTypes.string,
		vertAlign: PropTypes.oneOf(["top","middle","center","bottom"])
	}

	static defaultProps={
		border:{
			left:DefaultLine,
			right:DefaultLine,
			top:DefaultLine,
			bottom:DefaultLine
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
