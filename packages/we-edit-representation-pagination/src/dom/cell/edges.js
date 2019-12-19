import React from "react"
import Group from "../../composed/group"

const Edge=({sz:size,color,d})=><path strokeWidth={size} stroke={color} d={d}/>

export default ({top,left,right,bottom, width,height, ...props})=>(
    <Group {...props}>
        <Edge {...top}  d={`M0 0 h${width}`}/>
        <Edge {...bottom} d={`M0 ${height} h${width}`}/>
        <Edge {...right} d={`M${width} 0 v${height}`}/>
        <Edge {...left} d={`M0 0 v${height}`}/>
    </Group>
)