import React,{Fragment} from "react"
import {compose, mapProps, setDisplayName} from "recompose"

import {whenSelectionChangeDiscardable} from "we-edit"
import UnitInput from "../components/unit-input"

import {Layout} from "../shape/when-active"

export default compose(
	setDisplayName("page"),
	whenSelectionChangeDiscardable(),
	mapProps(({children,dispatch,selection})=>{
		const style=selection&&selection.props("page",false)||{}
		return {
			children,
			style,
		}
	}),
)(({children, style})=>{
	return (
		<Fragment>			
			<Layout style={style}/>
			{children}
		</Fragment>
	)
})