import React from "react"
import Base from "../list"
import {Paragraph} from "./paragraph"

import {editable} from "model/edit"
import recomposable from "./recomposable"

export default class List extends editable(recomposable(Base)){
    
}
