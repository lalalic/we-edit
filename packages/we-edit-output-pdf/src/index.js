import React, {Component, Fragment} from "react"
import {Emitter} from "we-edit"
import Pagination from "we-edit-view-pagination"

export default class PDF extends Component{
	render(){
		return null
	}
}

Emitter.support(
	<Emitter 
		type="pdf"
		name="PDF Document(*.pdf)"
		view={<Pagination/>}>
		<PDF/>
	</Emitter>
)