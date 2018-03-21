import React from "react"
import Base from "../paragraph"

export default class Paragraph extends Base{
	render(){
		return (
			<p>{this.props.children}</p>
		)
	}
}