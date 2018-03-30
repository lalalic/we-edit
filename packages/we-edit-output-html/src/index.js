import React, {Component} from "react"
import {Emitter} from "we-edit"
import Html from "we-edit-presentation-html"

export default class HTML extends Component{
	render(){
		return null
	}
}

Emitter.support(
	<Emitter 
		type="html"
		name="HTML Document(*.html)"
		presentation={<Html/>}>
		<HTML/>
	</Emitter>
)