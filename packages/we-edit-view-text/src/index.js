import React from "react"
import {view} from "we-edit"

import ViewerTypes from "./all"
import EditorTypes from "./edit"


export default props=><view {...{ViewerTypes,EditorTypes, ...props}}/>
