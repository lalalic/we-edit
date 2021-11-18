import React from "react"
import base from "./base"

export default class oneOfType extends base{
    renderDialog(){
        const {types, ...props}=this.props
        const type=types[types.length-1]
        return <type {...props}/>
    }

    renderRibbon(){
        return this.renderTree()
    }

    renderTree(){
        const {types:[{Type:{type}}], ...props}=this.props
        const UIType=this.Types[type]
        return <UIType {...props}/>
    }
}