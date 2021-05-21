import React,{Fragment} from "react"
import {compose, mapProps, setDisplayName} from "recompose"

import {ToolbarSeparator} from "material-ui"

import {ACTION,whenSelectionChangeDiscardable} from "we-edit"
import UnitInput from "../components/unit-input"

export default compose(
	setDisplayName("paragraph"),
	whenSelectionChangeDiscardable(),
	mapProps(({children,dispatch,selection})=>{
		const style=selection&&selection.props("paragraph",false)||{}
		return {
			children,
			style,
			
		}
	}),
)(({children,style})=>{
	return (
		<Fragment>	
			<span style={{zoom:0.8}}>
				<span style={{fontSize:9}}>Left Indent:</span><br/>		
				<UnitInput style={{width:50}}/>
			</span>
			<span  style={{zoom:0.8}}>
				<span style={{fontSize:9}}>Right Indent:</span><br/>	
				<UnitInput  style={{width:50}}/>
			</span>
			<ToolbarSeparator/>
			{children}
		</Fragment>
	)
})