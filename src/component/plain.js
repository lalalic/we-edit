import React from "react"
import ViewerTypes from "plaintext"
import EditorTypes from "plaintext/edit"

import IType from "./IType"

export default props=><IType {...{ViewerTypes,EditorTypes, ...props}}/>