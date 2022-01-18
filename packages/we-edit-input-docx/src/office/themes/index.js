import React from "react"
import {PropTypesUI} from "we-edit-office"
import ColorShape from "./color/color-shape"
import {parseFile} from "../util"
import {dom} from "we-edit"
const BaseTheme=PropTypesUI.Theme

const fontSize=value=>value ? dom.Unknown.UnitShape.normalize(value+'px','pt') : value
export default {
    //$Types:{ColorShape}
    $settingDialogs:{
        diff:React.cloneElement(BaseTheme.$settingDialogs.diff,{parseFile}),
    },
    TextStyleShape:{
        size:{
            normalize: fontSize
        }
    },
    Text:{
        size:{
            normalize: fontSize
        }
    }
}