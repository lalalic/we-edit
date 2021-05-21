import React,{Fragment} from "react"
import {compose, mapProps, setDisplayName} from "recompose"

import {ACTION,whenSelectionChangeDiscardable} from "we-edit"
import UnitInput from "../components/unit-input"

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
			<UnitInput/>
            <UnitInput/>
			
			{children}
		</Fragment>
	)
})