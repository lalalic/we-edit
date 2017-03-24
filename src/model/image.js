import React, {PropTypes} from "react"
import Component from "./component"


export default class Image extends Component{
	static displayName="image"
	static propTypes={
		width: PropTypes.number.isRequired,
		height: PropTypes.number.isRequired,
		src: PropTypes.string
	}
}
