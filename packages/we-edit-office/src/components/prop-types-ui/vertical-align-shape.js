import React from "react"
import base from "./one-of"

import IconVertAlignBottom from "material-ui/svg-icons/editor/vertical-align-bottom"
import IconVertAlignMiddle from "material-ui/svg-icons/editor/vertical-align-center"
import IconVertAlignTop from "material-ui/svg-icons/editor/vertical-align-top"

export default class VertAlignShape extends base{
    static defaultProps={
        icons:[<IconVertAlignTop/>,<IconVertAlignMiddle/>,<IconVertAlignBottom/>],
    }
}