import React from "react"
import PropTypes from "prop-types"

import Component from "./component"


export default class Image extends Component{
	static displayName="image"
	static propTypes={
		width: PropTypes.number.isRequired,
		height: PropTypes.number.isRequired,
		src: PropTypes.string
	}
}
