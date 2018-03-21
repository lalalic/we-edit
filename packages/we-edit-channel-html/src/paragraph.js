import React from "react"
import Base from "we-edit/model/paragraph"

export default class Paragraph extends Base{
	render(){
		return (
			<p>{this.props.children}</p>
		)
	}
}
