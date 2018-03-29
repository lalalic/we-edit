import React from "react"
import {View} from "we-edit"

import ViewerTypes from "./all"
import EditorTypes from "./edit"


export default props=><View {...{ViewerTypes,EditorTypes, ...props}}/>
