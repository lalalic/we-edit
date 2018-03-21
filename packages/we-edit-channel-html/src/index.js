import React from "react"
import {Channel} from "we-edit/components"

import ViewerTypes from "html"
import EditorTypes from "html/edit"

export default props=><Channel {...{ViewerTypes,EditorTypes,...props}}/>