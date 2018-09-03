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
		let {colorful, vanish,id,children, changed, selfChanged}=this.props
		
		let {fonts, size}=this.context
		
		let props={fonts, size, vanish, id, children,changed, selfChanged}
		if(this.context.colorful){
			props.color=color
		}
		return <Editors.Text {...props}/>
	}
}
