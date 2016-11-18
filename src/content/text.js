import React, {Component, PropTypes} from "react"
import {NoChild} from "./any"
import HtmlWordWrapper from "../wordwrap/html"

import Group from "../composed/group"

export default class Text extends NoChild{
	static displayName="text"

    compose(){
		const {composed}=this.computed
        const {parent}=this.context

		let composer=new this.constructor.WordWrapper(this.getContent(), this.getStyle())
        let text=null
        while(text=composer.next(parent.nextAvailableSpace())){
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
		const {width, height, descent, contentWidth, whiteSpace, ...others}=props
		return (
			<Group width={width} height={height} descent={descent}>
				<text {...{width,height,descent}} {...others} style={{whiteSpace:"pre"}}/>
			</Group>
		)
	}

	static contextTypes=Object.assign({
		inheritedStyle: PropTypes.object
	}, NoChild.contextTypes)

	static WordWrapper=HtmlWordWrapper
}
