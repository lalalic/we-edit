import React from "react"
import {compose,setDisplayName,mapProps} from "recompose"
import {whenSelectionChangeDiscardable} from "we-edit"

import {MenuItem,SvgIcon,ToolbarGroup} from "material-ui"
import DropdownButton from "../components/drop-down-button"

export default compose(
    setDisplayName("PictureSize"),
    whenSelectionChangeDiscardable(),
    mapProps(({dispatch})=>{
    }),
)(({})=>{
    return (
        <ToolbarGroup>
            <span style={{whiteSpace:"nowrap", marginLeft:2, marginRigth:2}}>
                <span>height</span>
                <input type="number"/>
            </span>
            <span style={{whiteSpace:"nowrap", marginLeft:2, marginRigth:2}}>
                <span>width</span>
                <input type="number"/>
            </span>
        </ToolbarGroup>
    )
})