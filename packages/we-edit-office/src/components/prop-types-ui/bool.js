import React from "react"
import MenuItem from "material-ui/MenuItem"
import CheckIconButton from "../check-icon-button"
import base from "./base"

export default class bool extends base{
    static displayName="bool"
    static defaultProps={
        isPrimitive:true,
    }
    renderRibbon(){
        const {name, value, label=name, path, uiContext, isPrimitive, ...props}=this.props
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

    renderMenu(){
        const {name, value, label=name, icon,}=this.props
        return <MenuItem primaryText={label} checked={!!value} onClick={e.this.set(this.path,!!!value)} leftIcon={icon}/>
    }
}