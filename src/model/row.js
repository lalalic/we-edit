import React, {PropTypes} from "react"
import Component from "./component"

export default class Row extends Component{
	static displayName="row"
	static propTypes={
		height: PropTypes.number,
		headers: PropTypes.number
	}
	
	static defaultProps={
		headers:0
	}
	
	static contextTypes={
		cols: PropTypes.arrayOf(PropTypes.number)
	}
}