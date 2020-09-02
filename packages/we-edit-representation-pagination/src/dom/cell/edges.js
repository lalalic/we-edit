import React from "react"
import Group from "../../composed/group"
import Line from "../../composed/line"


const Edge=({val, space, ...props})=><Line {...props}/>

export default ({top,left,right,bottom, width,height, ...props})=>(
    <Group {...props}>
        <Edge {...top} y1={0} y2={0} x1={0} x2={width}/>
        <Edge {...bottom} y1={height} y2={height} x1={0} x2={width}/>
        <Edge {...right} x1={width} x2={width} y1={0} y2={height}/>
        <Edge {...left} x1={0} x2={0} y1={0} y2={height}/>
    </Group>
)