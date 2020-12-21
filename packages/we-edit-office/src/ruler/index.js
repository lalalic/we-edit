import React from "react"

import {compose,setDisplayName,withProps} from "recompose"

import {ACTION, whenSelectionChangeDiscardable} from "we-edit"

import HorizontalRuler from "./horizontal"
import VerticalRuler from "./vertical"


export default compose(
	setDisplayName("Ruler"),
	whenSelectionChangeDiscardable(),
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
	withProps(({selection})=>{
		let {
				width,height,
				margin:{
					left:leftMargin,top:topMargin,right:rightMargin,bottom:bottomMargin,
					header,footer,
				}={},
				cols=[{x:leftMargin,width:width-leftMargin-rightMargin}]
			}=(selection && selection.props("layout")||{})

		let {
			indent:{left:leftIndent,right:rightIndent,firstLine}={}
		}=(selection && selection.props("paragraph",false)||{})

		return {
			width,height,leftMargin,topMargin,bottomMargin,rightMargin,leftIndent,rightIndent,firstLine,
			cols,
			header,footer
		}
	}),
)(({direction="horizontal", Ruler=direction=="horizontal" ? HorizontalRuler : VerticalRuler,...props})=>(
	<Ruler {...props}/>
))
