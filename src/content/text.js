import React, {Component, PropTypes} from "react"
import {NoChild} from "./any"
import HtmlWordWrapper from "../wordwrap/html"

export default class Text extends NoChild{
	displayName="text"

    compose(){
		const {composed}=this
        const {parent}=this.context
		const {content}=this.state
		let style=this.getFontStyle()
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
		const {color}=this.getFontStyle()
		if(color)
			props.fill=color
		
		return <text {...props}/>
	}
	
	
	getFontStyle(){
		const {parent}=this.context
		const {inline: style}=parent.props.contentStyle
		const {toggleStyles}=this.context
		//@TODO: need merge direct style and toggle style
		return style
	}
	
	static contextTypes=Object.assign({
		toggleStyles: PropTypes.object
	}, NoChild.contextTypes)

	static WordWrapper=HtmlWordWrapper
}
