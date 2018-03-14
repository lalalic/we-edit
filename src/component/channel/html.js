import React from "react"
import ViewerTypes from "html"
import EditorTypes from "html/edit"
import Channel from "./base"

export default props=><Channel {...{ViewerTypes,EditorTypes,...props}}/>