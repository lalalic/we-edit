import React, {Component} from "react"
import {Emitter} from "we-edit"
import Html from "we-edit-representation-html"

export default class HTML extends Component{
	render(){
		return null
	}
}

Emitter.support(
	<Emitter 
		name="HTML Document(*.html)"
		representation={<Html/>}>
		<HTML/>
	</Emitter>,
	"html"
)