import React, {Component, PropTypes} from "react"
import Any from "./any"
import Group from "../composed/group"
import HtmlWordWrapper from "../wordwrap/html"

export default class Text extends Any{
    constructor(){
		super(...arguments)
		Object.assign(this.state,{content:this.props.children})
	}
	displayName="text"
	

	render(){
		return null
	}

    compose(){
		super.compose()
        const {composed}=this
        const {parent}=this.context
		const {content}=this.state
        let composer=new this.constructor.WordWrapper(content)
        let text=null
        while(text=composer.next(parent.nextAvailableSpace())){
			const info=text
			text.onClick=e=>this.onClick(e,info)
			let content=(<text {...text}/>)
            composed.push(content)
            parent.appendComposed(content)
        }
		this.context.parent.on1ChildComposed(this)
    }

    onClick(event, text){
		const {offsetX}=event.nativeEvent
		let composer=new this.constructor.WordWrapper(text.children)
		let loc=composer.next({width:offsetX})||{end:0}
		let index=text.end-text.children.length+loc.end
        this.setState({cursor:index, text:"Raymond changed it"}, a=>this.reCompose())
    }

	static WordWrapper=HtmlWordWrapper
}
