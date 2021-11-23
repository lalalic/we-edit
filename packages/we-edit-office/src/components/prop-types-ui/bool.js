import React from "react"

import CheckIconButton from "../check-icon-button"
import base from "./base"

export default class bool extends base{
    renderRibbon(){
        const {name, value, label=name, path, uiContext, ...props}=this.props
        return <CheckIconButton {...props}
            label={label} 
            status={value ? "checked" : "unchecked"} 
            onClick={e=>this.set(this.path, !!!value)}
            children={this.theme.icon}
            />
    }

    renderTree(){
        const {value}=this.props
        return (<input type="checkbox" checked={!!value} onChange={e=>this.set(this.path,!!!value)}/>)
    }
}