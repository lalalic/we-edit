import React, {Component} from "react"
import {Emitter} from "we-edit"
import Channel from "we-edit-channel-html"

export default class HTML extends Component{
	render(){
		return null
	}
}

Emitter.support(
	<Emitter 
		type="html"
		name="HTML Document(*.html)"
		channel={<Channel/>}>
		<HTML/>
	</Emitter>
)