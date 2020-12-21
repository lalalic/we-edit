import React from "react"
import {compose,setDisplayName,mapProps} from "recompose"
import {whenSelectionChangeDiscardable} from "we-edit"

import {MenuItem,Subheader,ToolbarGroup} from "material-ui"
import DropdownButton from "../components/drop-down-button"
import IconColor from "material-ui/svg-icons/image/color-lens"

export default compose(
    setDisplayName("PictureEffect"),
    whenSelectionChangeDiscardable(),
    mapProps(({dispatch})=>{
        return {

        }
    }),
)(({})=>{
    return (
        <ToolbarGroup>
            <DropdownButton label="picture color" icon={<IconColor/>}>
                <Subheader>Recolor</Subheader>
                <MenuItem>
                </MenuItem>
            </DropdownButton>
        </ToolbarGroup>
    )
})