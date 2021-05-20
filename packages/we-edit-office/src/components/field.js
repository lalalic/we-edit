import React from "react"
export default ({style,label,children})=><div style={{flex:1, ...style}}><span>{label}</span><br/>{children}</div>