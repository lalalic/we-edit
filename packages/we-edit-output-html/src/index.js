import React, {Component} from "react"
import {Emitter} from "we-edit"
import View from "we-edit-view-html"

export default class HTML extends Component{
	render(){
		return null
	}
}

Emitter.support(
	<Emitter 
		type="html"
		name="HTML Document(*.html)"
		view={<View/>}>
		<HTML/>
	</Emitter>
)