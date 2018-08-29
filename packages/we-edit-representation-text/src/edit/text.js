import React,{Component} from "react"
import PropTypes from "prop-types"
import {Editors} from  "we-edit-representation-pagination"

export default class Text extends Component{
	static contextTypes={
		color:PropTypes.bool,
		fonts: PropTypes.string,
		size: PropTypes.number
	}
	
	render(){
		let {color, vanish,id,children}=this.props
		if(vanish || children.length==0)
			return null
		
		let {fonts, size}=this.context
		
		let props={fonts, size, vanish, id, children}
		if(this.context.color){
			props.color=color
		}
		return <Editors.Text {...props}/>
	}
}
