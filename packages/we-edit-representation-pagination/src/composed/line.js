import React, {PureComponent as Component} from "react"
import PropTypes from "prop-types"
import Group from "./group"

export default class extends Component{
	static propTypes={
		width:PropTypes.number.isRequired,
		height: PropTypes.number.isRequired,
	}
	render(){
		return (<Group {...this.props} className="line"/>)
	}
}
