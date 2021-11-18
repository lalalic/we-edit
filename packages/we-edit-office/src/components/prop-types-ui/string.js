import React from "react"
import base from "./base"

export default class extends base{
    type="text"
    renderRibbon(){
        const {name, value, label=name}=this.props
        return <input {...{
            type:this.type,
            hint:label,
            value, 
            placeholder:label, 
            onChange:e=>this.set(this.path, e.target.value)
        }}/>
    }

    renderTree(){
        return this.renderRibbon()
    }       
}