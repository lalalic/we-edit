import React from "react"
export default ({children, ...props})=>React.cloneElement(children,props)
