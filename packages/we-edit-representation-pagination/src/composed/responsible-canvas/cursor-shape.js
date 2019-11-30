import React from "react"

const CursorShape=({ y = 0, x = 0, height = 0, color = "black", style }) => (
    <path d={`M${x} ${y} v${height}`} strokeWidth={1} stroke={color} style={style} />
)

CursorShape.displayName = "CursorShape"

export default CursorShape
