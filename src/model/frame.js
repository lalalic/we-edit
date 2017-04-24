import React, {PropTypes} from "react"
import Component from "./component"

export default class Frame extends Component{
	static displayName="frame"
	static propTypes={
		position:PropTypes.shape({
			x:PropTypes.number,
			y:PropTypes.number 
		}),
		width:PropTypes.number.isRequired,
		height:PropTypes.number.isRequired
	}
}