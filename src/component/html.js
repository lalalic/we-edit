import React from "react"
import ViewerTypes from "html"
import EditorTypes from "html/edit"
import IType from "./IType"

export default props=><IType {...{ViewerTypes,EditorTypes,...props}}/>