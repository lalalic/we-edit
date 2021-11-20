import React from "react"
import base from "./base"

export default class shape extends base{
    get schema(){
        const {schema={}}=this.props
        return schema
    }

    get value(){
        const {value={}}=this.props
        return value
    }

    renderDialog(){
        const theme=this.theme
        const {uiContext="Dialog"}=this.context
        return Object.keys(this.schema).map(key=>{
            const {props, type, UIType=this.getUIType(type), value=this.value[key]}=this.schema[key]?.Type||{}
            if(!UIType || theme[key]?.[uiContext]===false)
                return null
            return <UIType {...{...props, value, key, name:key, path:`${this.makePath(key)}`}}/>
        })
    }

    renderRibbon(){
        return this.renderDialog()
    }

    renderTree(){
        return this.renderDialog()
    }
}