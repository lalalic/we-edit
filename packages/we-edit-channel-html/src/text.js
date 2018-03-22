import React from "react"
import {Text as Base} from "we-edit/model"

export default class Text extends Base{
	render(){
		const {fonts,size,color,bold,italic,vanish}=this.props
		return (
			<span>{this.props.children}</span>
		)
	}
}
