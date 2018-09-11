import React,{Component} from "react"
import PropTypes from "prop-types"
import {models} from "we-edit"

import Text from "./text"

export default class $exp extends models.$exp{
    render(){
        const {expression,name,defaultValue,children, getText, ...props}=this.props
        const text=getText(this.props)
        return <Text {...props} color="red" children={`${text}`}/>
    }
}
