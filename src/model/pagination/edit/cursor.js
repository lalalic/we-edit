import React, {Component, PropTypes} from "react"

import EditableText from "../model/pagination/edit/text"
import {getContent,getContentClientBoundBox} from "./selector"

let timer
export const Cursor=({id,at})=>{
	let info={left:0, top:0, height:0}
	if(id){
		let {top,left,from}=getContentClientBoundBox(id,at)
		const content=getContent(id)
		const text=content.getContent()
		let wordwrapper=new EditableText.WordWrapper("", content.Style)
		let contentWidth=wordwrapper.stringWidth(text.substring(from,at))
		let {height, descent}=wordwrapper
		left+=contentWidth
		info={left, top, height}
	}
	let {top, left, height}=info
	return (
		<line
			x1={left}
			y1={top}
			x2={left}
			y2={top+height}
			strokeWidth={1}
			stroke={"black"}
			ref={node=>{
				timer && clearInterval(timer);
				timer=setInterval(a=>{
					let y1=node.getAttribute('y1'), y2=node.getAttribute('y2')
					node.setAttribute('y2',y1==y2 ? top+height : top)
				}, 700)
			}}
			/>
	)
}