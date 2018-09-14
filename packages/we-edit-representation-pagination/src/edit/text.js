import React from "react"
import Base from "../text"

import {editify} from "we-edit"
import recomposable from "./recomposable"


export default class Text extends editify(recomposable(Base)){

}
