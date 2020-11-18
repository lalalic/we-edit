import React from "react"
import {createPortal} from "react-dom"
import Dialog from "material-ui/Dialog"

export default ({container=document.body,...props})=>createPortal(<Dialog style={{zoom:0.8}} {...props}/>, container)