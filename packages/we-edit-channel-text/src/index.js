import React from "react"
import {Channel} from "we-edit"

import ViewerTypes from "."
import EditorTypes from "./edit"


export default props=><Channel {...{ViewerTypes,EditorTypes, ...props}}/>
