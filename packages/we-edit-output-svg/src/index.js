import React, {Component, Children} from "react"
import {Emitter} from "we-edit"
import Pagination from "we-edit-representation-pagination"

export default class SVG extends Component{
	render(){
		const {stream,pages}=this.props
		stream.write(pages)
		return null
	}
}

Emitter.support(
	<Emitter 
		type="svg"
		name="SVG Document(*.svg)"
		representation={<Pagination/>}
		>
		<SVG/>
	</Emitter>,
)