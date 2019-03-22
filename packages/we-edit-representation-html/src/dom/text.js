import React from "react"
import {dom} from "we-edit"
const {Text:Base}=dom

export default class Text extends Base{
	render(){
		const {fonts:fontFamily,size,color,bold,italic,vanish}=this.props
		let style={fontFamily,fontSize:`${size}pt`,color,fontStyle:"normal"}
		if(bold)
			style.fontWeight=700
		
		if(vanish)
			style.display="none"
		
		if(italic)
			style.fontStyle="italic"
		
		return (
			<span style={style}>{this.props.children}</span>
		)
	}
}
