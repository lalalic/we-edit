import PropTypes from "prop-types"
import Component from "./component"

export default class Table extends Component{
	static displayName="table"
	static propTypes={
		width: this.UnitShape,
		indent: this.UnitShape,
		cols: PropTypes.arrayOf(PropTypes.shape({
				x: this.UnitShape,
				width:this.UnitShape
			})).isRequired,
	}

	static defaultProps={
		indent:0
	}

	static childContextTypes={
		cols:PropTypes.oneOfType([
			PropTypes.func,
			this.propTypes.cols,
		]).isRequired
	}

	getChildContext(){
		return {
			cols:this.props.cols
		}
	}
}
