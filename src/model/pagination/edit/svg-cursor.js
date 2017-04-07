import React from "react"

import {Text} from "pagination"
import {Cursor} from "state/cursor"
import {getContent,getContentStyle} from "state/selector"

export class SVGCursor extends Cursor{
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
