import React from "react"
import Base from "../paragraph"

export default class Paragraph extends Base{
	render(){
		const {spacing,indent,fonts,size,color,bold,italic,vanish}=this.props
		return (
			<p>{this.props.children}</p>
		)
	}
}