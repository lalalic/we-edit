import React,{Component} from "react"
import PropTypes from "prop-types"
import {Editors} from  "we-edit-representation-html"

export default class Text extends Component{
	static contextTypes={
		colorful:PropTypes.bool,
		fonts: PropTypes.string,
		size: PropTypes.number
	}

	render(){
		const {color, vanish,id,children, changed}=this.props

		const {fonts, size,colorful}=this.context

		const props={fonts, size, vanish, id, children,changed}
		if(colorful){
			props.color=color
		}
		return <Editors.Text {...props}/>
	}
}
