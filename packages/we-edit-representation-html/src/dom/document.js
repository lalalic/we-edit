import React from "react"
import {dom} from "we-edit"

export default class HtmlDocument extends dom.Document{
	getComposed(){
		return (
			<article style={{whiteSpace:"pre-wrap",textAlign:"initial"}}>
				{this.props.children}
			</article>
		)
	}
}