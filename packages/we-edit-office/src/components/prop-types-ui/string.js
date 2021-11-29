import React from "react"
import MenuItem from "material-ui/MenuItem"
import base from "./base"
import ToolbarField from "../toolbar-field"
import selectFile from "../file-select"


export default class extends base{
    type="text"
    renderRibbon(){
        const {name, value, label=name, style, FieldWrapper=ToolbarField, defaultValue}=this.$props
        return (
            <FieldWrapper label={label}>
                <input {...{
                    type:this.type,
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