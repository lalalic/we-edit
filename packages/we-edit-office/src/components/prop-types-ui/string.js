import React, { Fragment } from "react"
import MenuItem from "material-ui/MenuItem"
import base from "./base"
import ToolbarField from "../toolbar-field"
import selectFile from "../file-select"
import CheckIconButton from "../check-icon-button"


export default class extends base{
    static displayName="string"
    static defaultProps={
        isPrimitive:true,
        type: "text",
    }
    
    renderRibbon(){
        const {name, value, label=name,accept, icon, style, FieldWrapper=ToolbarField, type, isPrimitive, ...props}=this.$props
        if(type=="file"){
            return <CheckIconButton {...props}
                        label={label} 
                        status={value ? "checked" : "unchecked"} 
                        onClick={e=>selectFile(accept).then(url=>this.set(this.path,url))}
                        children={icon}
                        />
        }
        return (
            <FieldWrapper label={label}>
                <input {...{
                    type,
                    title:label,
                    value, 
                    style,
                    onChange:e=>this.set(this.path, e.target.value)
                }}/>
            </FieldWrapper>
        )
    }

    renderTree(){
        return this.renderRibbon(false)
    }   
    
    renderMenu(){
        const {name, label=name, accept}=this.$props
        return <MenuItem primaryText={label} onClick={e=>selectFile(accept).then(url=>this.set(this.path,url))}/>
    }
}