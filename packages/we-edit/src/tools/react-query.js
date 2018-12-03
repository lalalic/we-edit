import React, {Children} from "react"
import cssSelector from "./css"

export default class Query{
    static Selector={
        "#":id=>element=>{
            return element.props["id"]==id
        },
        "[":(name,value)=>element=>{
            if(value===undefined)
                return Object.keys(element.props).includes(name)
            return element.props[name]==value
        },
        ".":className=>element=>{
            return (element.props.className||"").split(/\s+/).includes(className)
        },
        type:type=>element=>{
            return typeof(element.type)=="string" ? element.type===type : element.type.displayName===type
        }
    }
    constructor(element,selector){
        if(selector instanceof Query)
			return selector

        this._nodes=[]

		if(Array.isArray(element)){
            this._nodes=element.filter(a=>React.isValidElement(a))
        }else if(React.isValidElement(element))
            this._nodes.push(element)
    }

    _asSelector(selector){
        switch(typeof(selector)){
        case "function":
            return selector
        break
        case "string":
            return cssSelector(selector,el=>new this.constructor(el),this.constructor.Selector)
        break
        case "object":
            if(selector instanceof Query){
                return element=>selector.has(element)
            }else{
                throw new Error("not supported react-query selector")
            }
        default:
            return a=>true
        }
    }

    get length(){
        return this._nodes.length
    }

	attr(k){
		if(this.length){
			const element=this._nodes[0]
            switch(k){
            case "type":
                return element.type
            break
            case "children":
                return this.children()
            break
            default:
                return element.props[k]
            }
		}else{
			return null
		}
	}

	children(selector){
        const select=this._asSelector(selector)
        const filtered=this._nodes.slice(0,1).reduce((found,el)=>{
            Children.toArray(el.props.children)
                .reduce((found,child)=>{
                    if(select(el)){
                        found.push(el)
                    }
                    return found
                },found)
            return found
        },[])
		return new this.constructor(filtered)
	}

    has(selector){
        const select=this._asSelector(selector)
        return !!this._nodes.find(el=>select(el))
    }

	find(selector){
		const select=this._asSelector(selector)
		let found=this._nodes.reduce((found,el)=>{
			traverse(el,a=>{
				if(!!select(a)){
					found.push(a)
				}
			},k)
			return found
		},[])
		return new this.constructor(found)
	}

    findFirst(selector){
        const select=this._asSelector(selector)
        var found=null
        for(let i=0,len=this._nodes.length;i<len;i++){
            if(!found){
                traverse(this._nodes[i],a=>{
                    if(!!select(a)){
                        found=a
                        return true
                    }
                })
            }
        }
        return new this.constructor(found)
    }
}

function traverse(el, f, right=false){
    if(!React.isValidElement(el))
        return

    if(f(el))
        return el

    if(typeof(el.props.children)=="string")
        return

    const children=Children.toArray(el.props.children)
    if(children.length>0){
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
}
