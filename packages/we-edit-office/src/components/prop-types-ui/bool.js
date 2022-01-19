import React from "react"
import {MenuItem} from "../menu"
import CheckIconButton from "../check-icon-button"
import base from "./base"

export default class bool extends base{
    static displayName="bool"
    static defaultProps={
        isPrimitive:true,
    }
    renderRibbon(){
        const {name, value, label=name,icon, path, uiContext, isPrimitive,type,theme, ...props}=this.$props
        return <CheckIconButton {...props}
            label={label} 
            disabled={this.context.disabled}
            status={value ? "checked" : "unchecked"} 
            onClick={e=>this.set(this.path, !!!value)}
            children={icon}
            />
    }

    renderTree(){
        const {value}=this.$props
        return (<input type="checkbox" checked={!!value} disabled={this.context.disabled} onChange={e=>!this.context.disabled&&this.set(this.path,!!!value)}/>)
    }

    renderMenu(){
        const {name, value, label=name, icon,}=this.$props
        return <MenuItem primaryText={label} checked={!!value} onClick={e=>!this.context.disabled && this.set(this.path,!!!value)} leftIcon={icon}/>
    }
}