import React from "react"
import PropTypes from "prop-types"
import {connect} from "react-redux"
import {compose,setDisplayName,getContext,withContext}  from "recompose"


export const WithSelection=compose(
	setDisplayName("WithSelectionProps"),
	getContext({
		selected:PropTypes.func
	}),
	connect((state,{selected})=>{
		return {
			selection: selected(state)
		}
	}),
	withContext(
		{selection:PropTypes.shape({props:PropTypes.func})},
		({selection})=>({selection}),
	),
)(({children,style})=><div style={style}>{children}</div>)

export default WithSelection