import React,{Fragment} from "react"
import PropTypes from "prop-types"
import {connect} from "react-redux"
import {compose,setDisplayName,getContext,withContext}  from "recompose"
import {when} from "./event"
import {getSelection} from "../state/selector"


export const WithSelection=compose(
	setDisplayName("WithSelection(when(cursorPlaced))"),
	when("cursorPlaced",({style,query})=>{
		return {
			selection: query.asSelection(style)
		}
	}),

	withContext(
		{selection:PropTypes.shape({props:PropTypes.func})},
		({selection})=>({selection}),
	),
)(({children})=><Fragment>{children}</Fragment>)

export default WithSelection