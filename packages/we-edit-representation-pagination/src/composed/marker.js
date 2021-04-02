import React, {PureComponent} from "react"
export default class Marker extends PureComponent{
    render(){
        const {type, id, ...props}=this.props
        return (
            <use href={`#${type}`} {...{width:12,height:12,x:-12,y:-12,...props}}/>
        )
    }
}