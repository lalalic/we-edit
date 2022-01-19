import React from "react"

import {compose,setDisplayName,withProps} from "recompose"

import {ACTION, whenSelectionChange,connect, getUI} from "we-edit"

import HorizontalRuler from "./horizontal"
import VerticalRuler from "./vertical"


export default compose(
	setDisplayName("Ruler"),
	whenSelectionChange(),
	withProps(({dispatch})=>({
		setLeftMargin(left){
			dispatch(ACTION.Selection.UPDATE({section:{pgMar:{left}}}))
		},
		setRightMargin(right){
			dispatch(ACTION.Selection.UPDATE({section:{pgMar:{right}}}))
		},
		setBottomMargin(bottom){
			dispatch(ACTION.Selection.UPDATE({section:{pgMar:{bottom}}}))
		},
		setTopMargin(top){
			dispatch(ACTION.Selection.UPDATE({section:{pgMar:{top}}}))
		},
		setFirstLine(firstLine){
			dispatch(ACTION.Selection.UPDATE({paragraph:{indent:{firstLine}}}))
		},
		setLeftIndent(left){
			dispatch(ACTION.Selection.UPDATE({paragraph:{indent:{left}}}))
		},
		setRightIndent(right){
			dispatch(ACTION.Selection.UPDATE({paragraph:{indent:{right}}}))
		},
	})),
	connect((state)=>{
		const {scale=1}=getUI(state)
		return {scale}
	}),
	withProps(({selection})=>{
		const {
				width,height,
				margin:{left:leftMargin,top:topMargin,right:rightMargin,bottom:bottomMargin}={},
				cols=[],
			}=(selection?.props("layout")||{})

		const {indent:{left:leftIndent=0,right:rightIndent=0,firstLine=0}={}}=(selection?.props("paragraph",false)||{})
		const {pageY=0, column}=selection?.props("page",false)||{}

		return {
			width,height,leftMargin,topMargin,bottomMargin,rightMargin,leftIndent,rightIndent,firstLine,
			cols,column,
			pageY,
		}
	}),
)(({direction, pageY, ...props})=>(	
	direction=="vertical" ? 
		<div style={{position:"relative",top:pageY*props.scale}}><VerticalRuler {...props}/></div> :
		<HorizontalRuler {...props}/>
		
))
