import React, {Component, PropTypes} from "react"

export default class Mover extends Component{
    state={}
    render(){
        const {left:x,top:y, id}=this.state
        let caret=null
        if(id)
            caret=<rect x={x} y={y} width={2} height={20} fill="black"/>

        return (
            <g>
                <text x={x} y={y} {...this.props}>{`${x},${y}`}</text>
                {caret}    
            </g>
        )
    }
}
