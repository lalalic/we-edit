import React from "react"
import PropTypes from "prop-types"

import Component from "./component"

export default class extends Component{
	static displayName="section"
	static propTypes={
        create: PropTypes.func.isRequired,
		pgSz:PropTypes.shape({
			width:PropTypes.number,
			height:PropTypes.number,
		}),
		
		pgMar:PropTypes.shape({
			left:PropTypes.number,
			right:PropTypes.number,
			top:PropTypes.number,
			bottom:PropTypes.number,
			header:PropTypes.number,
			footer:PropTypes.number,
		})
	}
}