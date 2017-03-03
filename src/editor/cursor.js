import React, {Component, PropTypes} from "react"
import {connect} from "react-redux"
import EditableText from "./text"
import {ACTION as Selection_ACTION} from "./selection"
import {getContent,getContentClientBoundBox} from "./selector"

export const ACTION={
	AT: (contentId, from, width)=>dispatch=>{
		const content=getContent(contentId)
		const text=content.getContent()
		const wordwrapper=new EditableText.WordWrapper(text.substr(from), content.getStyle())
		const {end}=wordwrapper.next({width})||{end:0,contentWidth:0}
		dispatch(Selection_ACTION.SELECT(contentId, from+end))
	}
}

let timer
export const Cursor=({id,at})=>{
	let info={left:0, top:0, height:0}
	if(id){
		let {top,left,from}=getContentClientBoundBox(id,at)
		const content=getContent(id)
		const text=content.getContent()
		let wordwrapper=new EditableText.WordWrapper(text.substring(from,at), content.getStyle())
		let {end, contentWidth}=wordwrapper.next({width:Number.MAX_SAFE_INTEGER})||{end:0,contentWidth:0}
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

const NO_CURSOR={}
export default connect(state=>{
	const {selection:{start:{id,at},end}}=state
	if(id==0)
		return NO_CURSOR
	if(end.id==id && end.at==at)
		return end
	else
		return NO_CURSOR
})(Cursor)
