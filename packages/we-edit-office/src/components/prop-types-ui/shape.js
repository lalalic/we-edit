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

    render(){
        const theme=this.theme
        const {uiContext="Dialog"}=this.context
        return Object.keys(this.schema).map(key=>{
            const {props, type, Type=this.Types[type], value=this.value[key]}=this.schema[key].Type||{}
            if(!Type || theme[key][uiContext]===false)
                return null
            return <Type {...{...props, value, key, name:key, path:`${this.makePath(key)}`}}/>
        })
    }
}