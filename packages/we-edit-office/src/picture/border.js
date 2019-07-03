import React from "react"
import {compose,setDisplayName,mapProps} from "recompose"
import {ACTION, connect, getSelectionStyle} from "we-edit"

import {MenuItem,SvgIcon,ToolbarGroup, Subheader} from "material-ui"
import DropdownButton from "../components/drop-down-button"
import ColorButton from "../components/color-button"
import IconColor from "material-ui/svg-icons/image/color-lens"


export default compose(
    setDisplayName("PictureBorder"),
    connect(state=>({selection:getSelectionStyle(state)})),
    mapProps(({dispatch})=>{
    }),
)(({})=>{
    return (
        <ToolbarGroup>
            <ColorButton label="border color">
                <IconColor/>
            </ColorButton>

            <DropdownButton label="border color">
                <MenuItem primaryText="automatic"></MenuItem>
                <MenuItem primaryText="no color"></MenuItem>
                <Subheader>Theme Colors</Subheader>
                <MenuItem>
                    <SvgIcon/>
                    <SvgIcon/>
                    <SvgIcon/>
                </MenuItem>
                <Subheader>Standard Colors</Subheader>
                <MenuItem>
                    <SvgIcon/>
                    <SvgIcon/>
                    <SvgIcon/>
                </MenuItem>
            </DropdownButton>
        </ToolbarGroup>
    )
})