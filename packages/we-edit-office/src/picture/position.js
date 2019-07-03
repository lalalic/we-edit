import React from "react"
import {compose,setDisplayName,mapProps} from "recompose"
import {ACTION, connect, getSelectionStyle} from "we-edit"

import {MenuItem,SvgIcon,ToolbarGroup, Divider} from "material-ui"
import DropdownButton from "../components/drop-down-button"
import IconRotate from "material-ui/svg-icons/image/rotate-90-degrees-ccw"
import IconWrap from "material-ui/svg-icons/action/picture-in-picture"

export default compose(
    setDisplayName("PicturePosition"),
    connect(state=>({selection:getSelectionStyle(state)})),
    mapProps(({dispatch})=>{
    }),
)(({})=>{
    return (
        <ToolbarGroup>
            <DropdownButton label="wrap text" icon={<IconWrap/>}>
                <MenuItem primaryText="In Line with Text" leftIcon={<IconWrap/>}/>
                <Divider/>
                <MenuItem primaryText="Square" leftIcon={<IconWrap/>}/>
                <MenuItem primaryText="Tight" leftIcon={<IconWrap/>}/>
                <MenuItem primaryText="Through" leftIcon={<IconWrap/>}/>
                <MenuItem primaryText="Top and Bottom" leftIcon={<IconWrap/>}/>
                <Divider/>
                <MenuItem primaryText="Behind Text" leftIcon={<IconWrap/>}/>
                <MenuItem primaryText="In Front of Text" leftIcon={<IconWrap/>}/>
                <Divider/>
                <MenuItem primaryText="More Layout Options..."/>
            </DropdownButton>

            <DropdownButton label="rotate" icon={<IconRotate/>}>
                <MenuItem primaryText="Rotate Right 90" leftIcon={<IconRotate degree={90}/>}/>
                <MenuItem primaryText="Rotate Left 90" leftIcon={<IconRotate degree={-90}/>}/>
                <MenuItem primaryText="Flip Vertical" leftIcon={<IconRotate degree={180}/>}/>
                <MenuItem primaryText="Flip Horizontal" leftIcon={<IconRotate degree={-180}/>}/>
                <Divider/>
                <MenuItem primaryText="More Rotation Options..."/>
            </DropdownButton>
        </ToolbarGroup>
    )
})