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
			setLeftIndet(left){
				dispatch(ACTION.Selection.UPDATE({paragraph:{indent:{left}}}))
			}, 
			setRightIndent(right){
				dispatch(ACTION.Selection.UPDATE({paragraph:{indent:{right}}}))
			}, 
			setTopSpacing(top){
				dispatch(ACTION.Selection.UPDATE({paragraph:{spacing:{top}}}))
			}, 
			setBottomSpacing(bottom){
				dispatch(ACTION.Selection.UPDATE({paragraph:{spacing:{bottom}}}))
			}
		}
	})
)(({children,style, setLeftIndet, setRightIndent, setTopSpacing, setBottomSpacing})=>{
	return (
		<Fragment>	
			<ToolbarField label="Indent> Left">
				<UnitInput style={{width:70}} value={style?.indent?.left} onChange={setLeftIndet}/>
			</ToolbarField>
			<ToolbarField label="Right">
				<UnitInput style={{width:70}} value={style?.indent?.right} onChange={setRightIndent}/>
			</ToolbarField>
			<ToolbarSeparator/>

			<ToolbarField label="Spacing> Before">
				<UnitInput style={{width:70}} value={style?.spacing?.top} onChange={setTopSpacing}/>
			</ToolbarField>
			<ToolbarField label="After">
				<UnitInput style={{width:70}} value={style?.spacing?.bottom} onChange={setBottomSpacing}/>
			</ToolbarField>
			
			{children}
			<ToolbarSeparator/>
		</Fragment>
	)
})