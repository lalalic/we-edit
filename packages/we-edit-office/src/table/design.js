import React from "react"
import {compose,setDisplayName,getContext,mapProps} from "recompose"
import {getSelection, ACTION, connect, getSelectionStyle} from "we-edit"

import {Checkbox as CheckBox, ToolbarGroup,ToolbarSeparator as ToolbarSeparator0,MenuItem} from "material-ui"
import CheckIconButton from "../components/check-icon-button"
import DropDownButton from "../components/drop-down-button"

export default compose(
    setDisplayName("TableDesigner"),

)(({})=>{
    return (
        <ToolbarGroup>
            <CheckBox label="Header Row"/>
            <CheckBox label="Total Row"/>
            <CheckBox label="Banded Rows"/>

            <CheckBox label="First Column"/>
            <CheckBox label="Last Column"/>
            <CheckBox label="Banded Columns"/>
        </ToolbarGroup>
    )
})
