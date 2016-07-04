import React, {Component, PropTypes} from "react"
import {NoChild} from "./any"
import HtmlWordWrapper from "../wordwrap/html"

export default class Text extends NoChild{
	displayName="text"

    compose(){
		this._startComposeAt=Date.now()
		const {composed}=this
        const {parent, style}=this.context
		const {content}=this.state
        let composer=new this.constructor.WordWrapper(content, style)
        let text=null
        while(text=composer.next(parent.nextAvailableSpace())){
			let content=this.createComposedPiece(text)
            composed.push(content)
            parent.appendComposed(content)
        }
		parent.on1ChildComposed(this)
    }

	createComposedPiece(props){
		return <text {...props}/>
	}

	static WordWrapper=HtmlWordWrapper
}
