import PropTypes from "prop-types"
import Component from "./component"

export default class __$1 extends Component{
	static displayName="section"
	static propTypes={
        create: PropTypes.func,
		page:PropTypes.shape({
			width:PropTypes.number,
			height:PropTypes.number,
			margin:PropTypes.shape({
				left:PropTypes.number,
				right:PropTypes.number,
				top:PropTypes.number,
				bottom:PropTypes.number,
			}),
			cols:PropTypes.arrayOf(PropTypes.shape({
				x:PropTypes.number,
				y:PropTypes.number,
				width:PropTypes.number,
			}))
		})
	}
}
