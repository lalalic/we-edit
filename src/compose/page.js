import React, {Component, PropTypes} from "react"
import Group from "./group"
import Line from "./line"

export default class Page extends Component{
    render(){
        const {x,y,width, height, margin, columns, header, footer}=this.props
        return (
            <Group x={x} y={y}>
                <rect x={0} y={0} width={width} height={height} fill="white"/>
                {header}
                {columns.map((a,i)=>{
                    const {children: lines, x,y}=a
                    let lineY=0
                    return (
                        <Column key={i} x={x} y={y}>
                            {lines.map((a,i)=>{
                                let {height, ...others}=a
                                return <Line key={i} x={0} y={lineY+=height} {...others}/>
                            })}
                        </Column>
                    )
                })}
                {footer}
            </Group>
        )
    }

    static propTypes={
        columns: PropTypes.arrayOf(PropTypes.object).isRequired,
        header: PropTypes.element,
        footer: PropTypes.element
    }
}

class Column extends Group{}
