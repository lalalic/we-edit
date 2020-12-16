import React from "react"

export default ({children, getValue})=>React.cloneElement(children,{children:getValue()})