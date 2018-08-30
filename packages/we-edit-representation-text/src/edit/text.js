import React,{Component} from "react"
import PropTypes from "prop-types"
import {Editors} from  "we-edit-representation-html"

export default class Text extends Component{
	static contextTypes={
		color:PropTypes.bool,
		fonts: PropTypes.string,
		size: PropTypes.number
	}
	
	render(){
		let {color, vanish,id,children, changed, selfChanged}=this.props
		if(vanish || children.length==0)
			return null
		
		let {fonts, size}=this.context
		
		let props={fonts, size, vanish, id, children,changed, selfChanged}
		if(this.context.color){
			props.color=color
		}
		return <Editors.Text {...props}/>
	}
}
