import React from "react"
import Base from "../section"

export default class Section extends Base{
	render(){
		return (
			<section>{this.props.children}</section>
		)
	}
}