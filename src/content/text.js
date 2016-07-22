import React, {Component, PropTypes} from "react"
import {NoChild, isToggleStyle} from "./any"
import HtmlWordWrapper from "../wordwrap/html"

import Group from "../composed/group"

export default class Text extends NoChild{
	static displayName="text"

    compose(){
		const {composed}=this.computed
        const {parent}=this.context
		const content=this.getContent()
		let style=this.getStyle()
		let composer=new this.constructor.WordWrapper(content, style)
		let defaultStyle={
			whiteSpace:'pre',
			fontSize:`${style.sz}px`,
			fontWeight:style.b ? 700 : 400,
			fontStyle:style.i ? "italic" : "normal",
			height: composer.height,
			descent: composer.descent
		}

		if(style.color)
			defaultStyle.fill=style.color

        let text=null
        while(text=composer.next(parent.nextAvailableSpace())){
			Object.assign(text,defaultStyle)
            composed.push(text)
            parent.appendComposed(this.createComposed2Parent(text))
        }
		parent.on1ChildComposed(this)
    }

	getStyle(){
		const {inheritedStyle}=this.context
		return 'rFonts,sz,color,b,i,vanish'.split(",").reduce((style, key)=>{
            let stylePath=`rPr.${key}`
            let value=inheritedStyle.get(stylePath)
            if(value!=undefined){
                style[key]=value
			}
            return style
        },{})
	}

	createComposed2Parent(props){
		const {color}=this.getStyle()
		if(color)
			props.fill=color
		props.style={whiteSpace:'pre'}
		const {width, height, descent, ...others}=props
		return <Group width={width} height={height} descent={descent}><text {...props} style={{whiteSpace:"pre"}}/></Group>
	}

	static contextTypes=Object.assign({
		inheritedStyle: PropTypes.object
	}, NoChild.contextTypes)

	static WordWrapper=HtmlWordWrapper
}
