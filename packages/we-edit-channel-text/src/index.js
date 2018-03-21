import React from "react"
import {Channel} from "we-edit/components"

import ViewerTypes from "plain"
import EditorTypes from "plain/edit"


export default props=><Channel {...{ViewerTypes,EditorTypes, ...props}}/>