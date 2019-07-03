import React from "react"
import {compose,setDisplayName,mapProps} from "recompose"
import {ACTION, connect, getSelectionStyle} from "we-edit"

import {MenuItem,Subheader, SvgIcon,ToolbarGroup} from "material-ui"
import DropdownButton from "../components/drop-down-button"
import IconColor from "material-ui/svg-icons/image/color-lens"

export default compose(
    setDisplayName("PictureEffect"),
    connect(state=>({selection:getSelectionStyle(state)})),
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