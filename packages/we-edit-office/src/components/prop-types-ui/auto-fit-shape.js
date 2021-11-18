import React from "react"
import base from "./one-of"

import IconFitBlock from "material-ui/svg-icons/editor/border-all"
import IconFitFont from "material-ui/svg-icons/editor/format-color-text"

export default class AutofitShape extends base{
    static defaultProps={
        icons:[<IconFitBlock/>,<IconFitFont/>]
    }
}