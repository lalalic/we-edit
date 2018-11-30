import React, {Children} from "react"

export default class Query{
    constructor(element){
        this.element=element
    }

    traverse(a, func){

    }
}

function traverse(el, f, right=false){
    if(f(el))
        return el
	let children=Children.toArray(el.props.children)
    return !!children[`find${right ? "Last" :""}`](child=>{
        let result=f(child)
        if(result===true){
            return true
        }else if(result===false){
            return false
        }else{
            return !!traverse(child,f,right)
        }
    })
}
