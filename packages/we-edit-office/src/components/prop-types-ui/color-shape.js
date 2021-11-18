import React from "react"
import base from "./base"
import ColorButton from "../color-button"

export default class ColorShape extends base{
    renderRibbon(){
        const {types, value, path,name,label=name, ...props}=this.props
        return (
            <ColorButton {...props}
                status={value?"checked":"unchecked"}
                onChange={color=>this.set(this.path,color)}
                value={value||""}
                label={label}
                />
        )
    }

    renderDialog(){
        const {types, value, path,name,...props}=this.props
        return this.lineField(<input type="color" name={name} value={value} onChange={e=>this.set(this.path, e.target.value)}/>)
    }

    renderTree(){
        return this.renderRibbon()
    }
}