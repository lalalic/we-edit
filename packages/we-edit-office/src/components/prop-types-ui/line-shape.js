import React from "react"
import base from "./one-of-type"

export default class LineShape extends base{
    renderRibbon(){
        return (
            <Menu>
                <ColorShape/>
                <MenuItem primaryText="Picture...">
                </MenuItem>
                <MenuItem primaryText="Picture...">
                </MenuItem>
                
            </Menu>
        )
    }
}