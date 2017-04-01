import React, {PropTypes} from "react"
import Component from "./component"

export default class List extends Component{
	static displayName="list"
	static propTypes={
		numId: PropTypes.string.isRequired,
		level: PropTypes.string.isRequired,
		label:PropTypes.node.isRequired,
		labelWidth: PropTypes.number.isRequired
	}
}
