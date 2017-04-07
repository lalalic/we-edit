import React from "react"

import {Text} from "pagination"
import {Cursor} from "state/cursor"
import {getContent,getContentStyle} from "state/selector"

export class SVGCursor extends Cursor{
	render(){
		let {top, left, height,color}=this.state
		height=0.1
		return (
			<line ref={a=>this.root=a}
				x1={left}
				y1={top}
				x2={left}
				y2={top+height}
				strokeWidth={1}
				stroke={"black"}
				/>
		)
	}

	toggle(){
		let {top, left, height,color}=this.state
		height=0.1
		let line=this.root
		let y1=line.getAttribute('y1')
		let y2=line.getAttribute('y2')
		line.setAttribute('y2',y1==y2 ? top+height : top)
	}

	info(docId, id, at, text, style){
		let texts=document.querySelectorAll(`#${docId} svg text[data-content="${id}"]`)
		if(texts.length==0)
			return null

		let {top,left,from}=getContentClientBoundBox(texts,at,id)
		let wordwrapper=new Text.WordWrapper(style)
		let width=wordwrapper.stringWidth(text.substring(from,at))
		let {height, descent}=wordwrapper
		return {top, left, width, height, descent}
	}
}

function getContentClientBoundBox(texts, at, id){
	let found, from
	for(let i=0, len=texts.length; i<len; i++){
		let a=texts[i]
		let end=parseInt(a.getAttribute('data-endAt'))
		let length=a.textContent.length
		let start=end-length
		if(start<=at && at<end){
			found=a
			from=start
			break
		}
	}

	if(!found){
		console.warn(`can't found text(${id},${at})`)
		return {top:0,left:0,from:0}
	}
	let {top,left}=found.getBoundingClientRect()
	return {top,left,from}
}

export default SVGCursor.connect()
