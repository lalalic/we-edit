import React from "react"
import Base from "../list"
import {Paragraph} from "./paragraph"

import {editify} from "we-edit"
import recomposable from "./recomposable"

export default class List extends editify(recomposable(Base)){

}
