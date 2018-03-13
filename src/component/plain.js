import React from "react"
import ViewerTypes from "plain"
import EditorTypes from "plain/edit"

import IType from "./IType"

export default props=><IType {...{ViewerTypes,EditorTypes, ...props}}/>