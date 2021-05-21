import React from "react"
export default ({children, label, style, labelStyle, ...props})=>(
    <span style={{zoom:0.8,marginLeft:2,marginRight:2,...style}} {...props}>
        <span style={{fontSize:10,paddingLeft:4, ...labelStyle}}>{label}</span><br/>		
        {children}
    </span>
)