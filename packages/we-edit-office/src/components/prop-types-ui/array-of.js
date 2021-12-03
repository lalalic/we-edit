import React from "react"
import base from "./base"
import $String from "./string"

export default class arrayOf extends base{
    static displayName="arrayOf"

    renderDialog(){
        const {value=[],type:{Type:{type}}, ...props}=this.props
        if("string,bool,number".split(",").includes(type)){
            const to=values=>values.map(a=>{
                switch(type){
                    case "bool":
                        return !!a
                    case "number":
                        return parseFloat(a)
                    default:
                        return a
                }
            })
            return <$String 
                value={value.join(",")} 
                {...props} 
                onChange={value=>this.set(this.path, to(value.split(",")) )}/>
        }
        return null
    }

    renderRibbon(){
        return this.renderDialog()
    }

    renderMenu(){
        return this.renderDialog()
    }
}