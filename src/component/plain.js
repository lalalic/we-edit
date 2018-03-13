import React from "react"
import ViewerTypes from "plain"
import EditorTypes from "plain/edit"

import Channel from "./channel"

export default props=><Channel {...{ViewerTypes,EditorTypes, ...props}}/>