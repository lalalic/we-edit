import React from "react"
import {models} from "we-edit"
const {Text:Base}=models

export default class Text extends Base{
	render(){
		const {fonts,size,color,bold,italic,vanish}=this.props
		return (
			<span>{this.props.children}</span>
		)
	}
}
