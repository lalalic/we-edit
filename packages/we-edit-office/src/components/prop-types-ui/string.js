import React from "react"
import base from "./base"
import ToolbarField from "../toolbar-field"


export default class extends base{
    type="text"
    renderRibbon(hinting=true){
        const {name, value, label=name, style, FieldWrapper=ToolbarField}=this.$props
        return (
            <FieldWrapper label={label}>
                <input {...{
                    type:this.type,
                    hint:label,
                    value, 
                    style,
                    placeholder: hinting ? label : "", 
                    onChange:e=>this.set(this.path, e.target.value)
                }}/>
            </FieldWrapper>
        )
    }

    renderTree(){
        return this.renderRibbon(false)
    }       
}