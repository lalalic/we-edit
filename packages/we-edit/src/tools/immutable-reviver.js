import React from "react"
import { Iterable } from "immutable"
export default function(key,value){
    const ob=this[key]
    if(React.isValidElement(ob) || ob.skipImmutable){
        return ob
    }
    
    return Iterable.isKeyed(value) ? value.toMap() : value.toList()
}