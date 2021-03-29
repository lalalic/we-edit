import React, {PureComponent} from "react"
export default class Marker extends PureComponent{
    render(){
        const {type, ...props}=this.props
        return (
            <use href={`#${type}`} {...props}/>
        )
    }
}