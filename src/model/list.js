import React, {PropTypes} from "react"
import Component from "./component"

export default class List extends Component{
	static displayName="list"
	static propTypes={
		label:PropTypes.node.isRequired,
		labelWidth: PropTypes.number.isRequired
	}
}
