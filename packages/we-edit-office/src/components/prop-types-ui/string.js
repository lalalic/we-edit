import React from "react"
import {MenuItem} from "../menu"
import base from "./base"
import selectFile from "../file-select"
import CheckIconButton from "../check-icon-button"


export default class extends base{
    static displayName="string"
    static defaultProps={
        isPrimitive:true,
        type: "text",
    }

    renderTree(){
        const {name, value, label=name,accept, icon, style, type, isPrimitive, $presets, ...props}=this.$props
        
        if(type=="file"){
            return <CheckIconButton {...props} disabled={this.context.disabled}
                        label={label} 
                        status={value ? "checked" : "unchecked"} 
                        onClick={e=>selectFile(accept).then(url=>this.set(this.path,url))}
                        children={icon}
                        />
        }
        return <input {...{
            type,
            title:label,
            value, 
            style,
            disabled:this.context.disabled,
            onChange:e=>this.set(this.path, e.target.value)
        }}/>
    }   
    
    renderMenu(){
        const {name, label=name, accept,type}=this.$props
        if(type=="file"){
            return <MenuItem primaryText={label} onClick={e=>!this.context.disabled && selectFile(accept).then(url=>this.set(this.path,url))}/>
        }
        return this.renderTree()
    }
}