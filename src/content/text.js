import React, {Component, PropTypes} from "react"
import {NoChild, isToggleStyle} from "./any"
import HtmlWordWrapper from "../wordwrap/html"

export default class Text extends NoChild{
	static displayName="text"

    compose(){
		const {composed}=this
        const {parent}=this.context
		const {content}=this.state
		let style=this.getStyle()
		let composer=new this.constructor.WordWrapper(content, style)
		let defaultStyle={
			whiteSpace:'pre',
			fontSize:`${style.sz}px`,
			fontWeight:style.b ? 700 : 400,
			fontStyle:style.i ? "italic" : "normal",
			height: composer.height
		}

		if(style.color)
			defaultStyle.fill=style.color

        let text=null
        while(text=composer.next(parent.nextAvailableSpace())){
			Object.assign(text,defaultStyle)
			let content=this.createComposedPiece(text)
            composed.push(content)
            parent.appendComposed(content)
        }
		parent.on1ChildComposed(this)
    }

	getStyle(){
		const {containerStyle}=this.context
		return 'rFonts,sz,color,b,i,vanish'.split(",").reduce((style, key)=>{
            let stylePath=`inline.${key}`
            let value=containerStyle.get(stylePath)
            if(value!=undefined){
                if(isToggleStyle(stylePath) && value<0){
					style[key]=value%2
				}else
					style[key]=value
			}
            return style
        },{})
	}

	createComposedPiece(props){
		const {color}=this.getFontStyle()
		if(color)
			props.fill=color
		props.style={whiteSpace:'pre'}
		const {width, height, end, ...others}=props
		return <Group width={width} height={height}><text {...props} style={{whiteSpace:"pre"}}/></Group>
	}

	static contextTypes=Object.assign({
		containerStyle: PropTypes.object
	}, NoChild.contextTypes)

	static WordWrapper=HtmlWordWrapper
}
