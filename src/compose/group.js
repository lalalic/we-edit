import React, {Component, PropTypes} from "react"

export default class Group extends Component{
    render(){
        const {x,y, ...others}=this.props
        return <g transform={`translate(${x||0} ${y||0})`}  {...others}/>
    }
}
