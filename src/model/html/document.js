import React from "react"
import Base from "../document"

export default class Document extends Base{
	render(){
		const {spacing,indent,fonts,size,color,bold,italic,vanish}=this.props
		return (
			<article>{this.props.children}</article>
		)
	}
}