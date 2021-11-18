import React from "react"
import PropTypes from "prop-types"

import IconAlignCenter from "material-ui/svg-icons/editor/format-align-center"
import IconAlignLeft from "material-ui/svg-icons/editor/format-align-left"
import IconAlignRight from "material-ui/svg-icons/editor/format-align-right"
import IconAlignJustify from "material-ui/svg-icons/editor/format-align-justify"

import base from "./one-of"

export default class AlianShape extends base{
    static defaultProps={
        icons: [<IconAlignLeft/>,<IconAlignRight/>,<IconAlignCenter/>,<IconAlignJustify/>]
    }
}