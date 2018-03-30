import React, {Component} from "react"
import {Emitter} from "we-edit"
import Pagination from "we-edit-presentation-pagination"

export default class PDF extends Component{
	render(){
		return null
	}
}

Emitter.support(
	<Emitter 
		type="pdf"
		name="PDF Document(*.pdf)"
		presentation={<Pagination/>}>
		<PDF/>
	</Emitter>
)