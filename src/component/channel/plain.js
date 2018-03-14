import React from "react"
import ViewerTypes from "plain"
import EditorTypes from "plain/edit"

import Channel from "./base"

export default props=><Channel {...{ViewerTypes,EditorTypes, ...props}}/>