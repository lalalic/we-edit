import React from "react"
import {PropTypesUI} from "we-edit-office"
import ColorShape from "./color/color-shape"
import {parseFile} from "../util"

const BaseTheme=PropTypesUI.Theme

export default {
    //$Types:{ColorShape}
    $settingDialogs:{
        diff:React.cloneElement(BaseTheme.$settingDialogs.diff,{parseFile}),
    }
}