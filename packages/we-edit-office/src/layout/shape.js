import React,{Fragment} from "react"
import {compose, mapProps, setDisplayName} from "recompose"
import {ToolbarSeparator} from "material-ui"

import {whenSelectionChangeDiscardable, dom} from "we-edit"
import PropTypesUI from "../components/prop-types-ui"

export default compose(
	setDisplayName("page"),
	whenSelectionChangeDiscardable(),
	mapProps(({children,dispatch,selection})=>{
		const anchor=selection&&selection.props("anchor",false)||{}
		const shape=selection&&selection.props("shape",false)||{}
		return {
			children,
			anchor,
			shape,
		}
	}),
)(({children, shape, anchor})=>{
	return (
		<Fragment>
			<PropTypesUI propTypes={dom.Shape.propTypes} uiContext="Ribbon" theme="Shape" value={shape}/>
			<ToolbarSeparator/>
			<PropTypesUI propTypes={dom.Anchor.propTypes} uiContext="Ribbon" theme="Anchor" value={anchor}/>
			<ToolbarSeparator/>
			{children}
			{!!children && <ToolbarSeparator/>}
		</Fragment>
	)
})