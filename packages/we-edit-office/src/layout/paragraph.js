import React,{Fragment} from "react"
import {compose, mapProps, setDisplayName, branch} from "recompose"

import {ToolbarSeparator} from "material-ui"

import {ACTION,whenSelectionChangeDiscardable} from "we-edit"
import UnitInput from "../components/unit-input"
import ToolbarField from "../components/toolbar-field"

export default compose(
	setDisplayName("paragraph"),
	whenSelectionChangeDiscardable(),
	mapProps(({children,dispatch,selection})=>{
		const style=selection?.props("paragraph",false)||null
		return {
			children,
			style,
		}
	})
)(({children,style})=>{
	return (
		<Fragment>	
			<ToolbarField label="Indent> Left">
				<UnitInput style={{width:70}} value={style?.indent?.left}/>
			</ToolbarField>
			<ToolbarField label="Right">
				<UnitInput style={{width:70}} value={style?.indent?.right}/>
			</ToolbarField>
			<ToolbarSeparator/>

			<ToolbarField label="Spacing> Before">
				<UnitInput style={{width:70}} value={style?.spacing?.top}/>
			</ToolbarField>
			<ToolbarField label="After">
				<UnitInput style={{width:70}} value={style?.spacing?.bottom}/>
			</ToolbarField>
			
			{children}
			<ToolbarSeparator/>
		</Fragment>
	)
})