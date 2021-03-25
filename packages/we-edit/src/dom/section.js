import PropTypes from "prop-types"
import Component from "./component"

export default class __$1 extends Component{
	static displayName="section"
	static propTypes={
        createLayout: PropTypes.func,
		layout:PropTypes.shape({
			width:PropTypes.number,
			height:PropTypes.number,
			margin:this.MarginShape,
			cols:PropTypes.arrayOf(PropTypes.shape({
				x:PropTypes.number,
				y:PropTypes.number,
				width:PropTypes.number,
			}))
		})
	}
}
