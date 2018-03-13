import React from "react"
import ViewerTypes from "html"
import EditorTypes from "html/edit"
import Channel from "./channel"

export default props=><Channel {...{ViewerTypes,EditorTypes,...props}}/>