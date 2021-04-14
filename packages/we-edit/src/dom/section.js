import PropTypes from "prop-types"
import Component from "./component"

export default class __$1 extends Component{
	static displayName="section"
	static propTypes={
        createLayout: PropTypes.func,
		layout:PropTypes.shape({
			width:this.UnitShape,
			height:this.UnitShape,
			margin:this.MarginShape,
			cols:PropTypes.arrayOf(PropTypes.shape({
				x:this.UnitShape,
				y:this.UnitShape,
				width:this.UnitShape,
			}))
		})
	}
}
