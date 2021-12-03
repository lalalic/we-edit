import React from "react"
import string from "./string"

export default class number extends string{
    static displayName="number"
    static defaultProps={
        isPrimitive:true,
    }
    
    type="number"
}