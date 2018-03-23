import React, {Component, Children} from "react"
import {Emitter} from "we-edit"
import Pagination from "we-edit-channel-pagination"

export default class SVG extends Component{
	render(){
		return Children.only(this.props.children)
	}
}

Emitter.support(
	<Emitter 
		type="svg"
		name="SVG Document(*.svg)"
		channel={<Pagination/>}
		>
		<SVG/>
	</Emitter>
)