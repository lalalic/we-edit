import React,{Component} from "react"
import PropTypes from "prop-types"

import {Editors} from "we-edit-representation-html"

export default class  Document extends Component{
	static contextTypes={
		color:PropTypes.bool,
		fonts: PropTypes.string,
		size: PropTypes.number
	}

	static childContextTypes={
		color:PropTypes.bool,
		fonts: PropTypes.string,
		size: PropTypes.number
	}

	getChildContext(){
		const {color, size=this.context.size, fonts=this.context.fonts}=this.props
		return {
			color,
			size:size||11,
			fonts:fonts||"arial",
		}
	}

	render(){
		return <Editors.Document {...this.props}/>
	}
}
