import React, {Children} from "react"
import cssSelector from "./css"

export default class Query{
    constructor(element,selector){
		if(selector instanceof Query)
			return selector
		
        this._nodes=[element]
		this.$=n=>new this.constructor(n)
    }
	
	attr(k){
		if(this.length){
			let element=[this._nodes[0]]
			
			if(["type","id","parent","children"].includes(k)){
				path.push(k)
			}else{
				path.push("props")
				path=path.concat(k.split("."))
			}
			return this._content.getIn(path)
		}else{
			return null
		}
	}
	
	children(){
		return new this.constructor(Children.toArray(this._nodes[0].props.children))
	}
	
	find(selector){
		let select=cssSelector(selector,this.$)
		let found=this._nodes.reduce((found,k)=>{
			traverse(this._content,node=>{
				if(!!select(node)){
					console.assert(!!node)
					found.push(node.get("id"))
				}
			},k)
			return found
		},[])
		return new this.constructor(this.state,found)
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
