import React from "react"
import Base from "../section"

export default class Section extends Base{
	render(){
		const {spacing,indent,fonts,size,color,bold,italic,vanish}=this.props
		return (
			<section>{this.props.children}</section>
		)
	}
}