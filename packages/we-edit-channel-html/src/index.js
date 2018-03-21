import React from "react"
import {Channel} from "we-edit/components"

import ViewerTypes from "./all"
import EditorTypes from "./edit"

export default props=><Channel {...{ViewerTypes,EditorTypes,...props}}/>
