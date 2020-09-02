import React, {Component} from "react"

export default class Line extends Component{
    render(){
        const {d, width:strokeWidth, color:stroke, style, sketched, compound, dash, join, cap, transparency, gradient, ...props}=this.props
        if(d){
            return <path {...{...props, d,stroke,strokeWidth}}/>
        }
        return <line {...{...props, stroke,strokeWidth}}/>
    }
}