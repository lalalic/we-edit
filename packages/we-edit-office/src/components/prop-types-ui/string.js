import React from "react"
import base from "./base"
import ToolbarField from "../toolbar-field"


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
}