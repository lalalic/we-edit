import React from "react"

import {compose,setDisplayName,withProps} from "recompose"

import {ACTION, whenSelectionChange,connect, getUI} from "we-edit"

import HorizontalRuler from "./horizontal"
import VerticalRuler from "./vertical"


export default compose(
	setDisplayName("Ruler"),
	whenSelectionChange(),
	connect((state)=>{
		const {scale=1}=getUI(state)
		return {scale}
	}),
	withProps(({selection,dispatch})=>{
		const {
				width,height,cols=[],
				margin:{left:leftMargin,top:topMargin,right:rightMargin,bottom:bottomMargin}={},
			}=(selection?.props("layout")||{})

		const {indent:{left:leftIndent=0,right:rightIndent=0,firstLine=0}={}}=(selection?.props("paragraph",false)||{})
		const {pageY=0, column}=selection?.props("page",false)||{}
		const isSection=selection?.props("section",false)
		const marginAction=margin=>isSection ? {section:{layout:{margin}}} : {page:{margin}}
		return {
			width,height,leftMargin,topMargin,bottomMargin,rightMargin,leftIndent,rightIndent,firstLine,
			cols,column,
			pageY,
			threshold:1,
			setLeftMargin(left){
				dispatch(ACTION.Selection.UPDATE(marginAction({left})))
			},
			setRightMargin(right){
				dispatch(ACTION.Selection.UPDATE(marginAction({right})))
			},
			setBottomMargin(bottom){
				dispatch(ACTION.Selection.UPDATE(marginAction({bottom})))
			},
			setTopMargin(top){
				dispatch(ACTION.Selection.UPDATE(marginAction({top})))
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
			setColGap(colGap){
				dispatch(ACTION.Selection.UPDATE(isSection ? {section:{layout:{colGap}}} : {page:{colGap}}))
			},
			moveColGap(colGapMove){
				dispatch(ACTION.Selection.UPDATE(isSection ? {section:{layout:{colGapMove}}} : {page:{colGapMove}}))
			}
		}
	}),
)(({direction, pageY, ...props})=>(	
	direction=="vertical" ? 
		<div style={{position:"relative",top:pageY*props.scale}}><VerticalRuler {...props}/></div> :
		<HorizontalRuler {...props}/>
		
))
