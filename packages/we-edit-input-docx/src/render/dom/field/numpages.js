import React from "react"

export default ({children, getValue})=>{
    return React.cloneElement(children,{children:getValue()})
}