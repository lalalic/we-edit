import React, {PureComponent} from "react"
export default class Marker extends PureComponent{
    render(){
        const {type}=this.props
        return (
            <g>
                <rect {...{width:2,height:2,fill:"red"}}/>
                <text stroke="red">{type}</text>
            </g>
            
        )
    }
}