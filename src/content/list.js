import React from "react"
import Paragraph from "./paragraph"
import {WordWrapper} from "./text"
import Group from "../composed/group"

export default class list extends Paragraph{
    static displayName="list"

	_newLine(){
        let line=super._newLine()

		if(this.computed.composed.length==0){
			let {indent}=this.getStyle()
			let {label,style}=this.getLabel()
			let wordWrapper=new WordWrapper(label,style)
			let {height,descent}=wordWrapper
			let {contentWidth, whiteSpace, ...text}=wordWrapper.next({width:indent.hanging})
			line.children.push(<Group
				x={0}
				index={-1}
				descent={descent}
				width={indent.hanging}
				height={height}>
				<Group width={indent.hanging} height={height}><text {...text}/></Group>
			</Group>)

			line.width-=indent.hanging
			line.height=height
			line.descent=descent
		}
		return line
	}

	getLabel(){
		const {directStyle}=this.props
		let label=directStyle.get("label")

		const {inheritedStyle}=this.context

		let style='rFonts,sz,color,b,i,vanish'.split(",").reduce((style, key)=>{
            let stylePath=`rPr.${key}`
			let value=directStyle.get("label."+stylePath)
			if(value==undefined)
				value=inheritedStyle.get(stylePath)

            if(value!=undefined){
                style[key]=value
			}
            return style
        },{})

		return {label,style}
	}
}
