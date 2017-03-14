import React, {Component, PropTypes} from "react"
export default class Image extends Component{
	static propTypes={
		width: PropTypes.number,
		height: PropTypes.number,
		src: PropTypes.string
	}
}