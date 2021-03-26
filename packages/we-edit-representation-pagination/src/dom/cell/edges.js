import React, {PureComponent} from "react"
import Group from "../../composed/group"
import Shape from "../../composed/shape"


const Edge=({val, space, ...props})=><Shape {...props}/>

export default class Edges extends PureComponent{
    render(){
        const {top,left,right,bottom, width,height, ...props}=this.props
        if(top.width==left.width && right.width==top.width && bottom.width==top.width){
            return (
                <Group {...props}>
                    <Shape d={`M0 0h${width}v${height}h${-width}v${-height}z`} {...top} fill="none"/>
                </Group>
            )
        }
        return (
            <Group {...props}>
                <Edge {...top} y1={0} y2={0} x1={0} x2={width}/>
                <Edge {...bottom} y1={height} y2={height} x1={0} x2={width}/>
                <Edge {...right} x1={width} x2={width} y1={0} y2={height}/>
                <Edge {...left} x1={0} x2={0} y1={0} y2={height}/>
            </Group>
        )
    }
}