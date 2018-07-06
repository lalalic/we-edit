import React from "react"
import PropTypes from "prop-types"

import {compose,setDisplayName,getContext,mapProps,withProps} from "recompose"
import {connect} from "react-redux"

import {ACTION} from "we-edit"

import HorizontalRuler from "./horizontal"
import VerticalRuler from "./vertical"


export default compose(
	setDisplayName("Ruler"),
	getContext({
		store:PropTypes.object,
		doc: PropTypes.object,
		selection: PropTypes.object
	}),
	withProps(({store:{dispatch},doc})=>({
		doc,
		setLeftMargin(value){
			dispatch(ACTION.Style.update({section:{pgMar:{left:value}}}))
		},
		setRightMargin(value){
			dispatch(ACTION.Style.update({section:{pgMar:{right:value}}}))
		},
		setBottomMargin(value){
			dispatch(ACTION.Style.update({section:{pgMar:{bottom:value}}}))
		},
		setTopMargin(value){
			dispatch(ACTION.Style.update({section:{pgMar:{top:value}}}))
		},
		setFirstLine(){
			dispatch(ACTION.Style.update({paragraph:{indent:{firstLine:value}}}))
		},
		setLeftIndent(){
			dispatch(ACTION.Style.update({paragraph:{indent:{left:value}}}))
		},
		setRightIndent(){
			dispatch(ACTION.Style.update({paragraph:{indent:{right:value}}}))
		}
	})),
	withProps(({doc,selection})=>{
		if(!selection){
			return {
				Ruler: a=>null
			}
		}
		let {
				pgSz:{width,height}, 
				pgMar:{
					left:leftMargin,top:topMargin,right:rightMargin,bottom:bottomMargin,
					header,footer,
				}
			}=selection.props("section")
			
		let {
			indent:{left:leftIndent,right:rightIndent,firstLine}={}
		}=selection.props("paragraph")
		
		return {
			width,height,leftMargin,topMargin,bottomMargin,rightMargin,leftIndent,rightIndent,firstLine,
			header,footer
		}
	}),
)(({direction="horizontal", Ruler=direction=="horizontal" ? HorizontalRuler : VerticalRuler, ...props})=>(
	<Ruler {...props}/>
))

