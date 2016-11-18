import React, {Component, PropTypes} from "react"
import {connect} from "react-redux"
import {WordWrapper} from "./text"
import * as Selection from "./selection"

export const ACTION={
	AT: (content:id, from, width, top, left)=>dispatch=>{
		const content=getComponentById(id)
		const text=content.getContent()
		const wordwrapper=new WordWrapper(text.substr(from), content.getStyle())
		const {end, contentWidth}=wordwrapper.next({width})||{end:0,contentWidth:0}
		const {height, descent}=wordwrapper
		dispatch(Selection.SELECT(id, from+end))
		dispatch({type:'cursor',payload:{top:top+descent,left:left+contentWidth,height}})
	}
}

export const reducer=(state={top:0,left:0,height:0}, {type, payload})=>{
	switch(type){
	case 'cursor':
		return payload
	}
	return state
}

let timer
export const Cursor=({top,left,height})=>(
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

export default connect(state=>state.cursor)(Cursor)