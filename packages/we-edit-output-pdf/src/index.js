import React, {Component} from "react"
import {Emitter} from "we-edit"
import Pagination from "we-edit-representation-pagination"

export default class PDF extends Component{
	render(){
		const {stream,pages}=this.props
		stream.write(pages)
		return null
	}
}

Emitter.support(
	<Emitter 
		name="PDF Document(*.pdf)"
		representation={<Pagination/>}>
		<PDF/>
	</Emitter>,
	"pdf"
)