import React, {Component} from "react"
import {Emitter} from "we-edit"
import Pagination from "we-edit-representation-pagination"

export default class PDF extends Component{
	render(){
		return null
	}
}

Emitter.support(
	<Emitter 
		type="pdf"
		name="PDF Document(*.pdf)"
		representation={<Pagination/>}>
		<PDF/>
	</Emitter>
)