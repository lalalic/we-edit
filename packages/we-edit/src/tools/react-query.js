import React, {Children} from "react"
import cheerio from "cheerio"
import TestRenderer from "react-test-renderer"
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
    constructor(element,selector,root){
        this._nodes=[]

		if(Array.isArray(element)){
            this._nodes=element.filter(a=>React.isValidElement(a))
        }else if(React.isValidElement(element)){
            this._nodes.push(element)
            if(!root){
                root=element
            }
        }
        this.root=root

        if(selector){
            return this.find(selector)
        }
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
                    if(select(child)){
                        found.push(child)
                    }
                    return found
                },found)
            return found
        },[])
		return new this.constructor(filtered,null,this.root)
	}

    has(selector){
        const select=this._asSelector(selector)
        return !!this._nodes.find(el=>select(el))
    }

    filter(selector){
        const select=this._asSelector(selector)
        return new this.constructor(this._nodes.filter(el=>!!select(el)), null,this.root)
    }

	find(selector){
		const select=this._asSelector(selector)
		let found=this._nodes.reduce((found,el)=>{
			traverse(el,function(a){
                const result=select(...arguments)
				if(!!result){
					found.push(a)
				}
                return result
			})
			return found
		},[])
		return new this.constructor(found,null,this.root)
	}

    findFirst(selector){
        const select=this._asSelector(selector)
        var found=null
        for(let i=0,len=this._nodes.length;i<len;i++){
            if(!found){
                traverse(this._nodes[i],function(a){
                    if(!!select(...arguments)){
                        found=a
                        return true
                    }
                })
            }
        }
        return new this.constructor(found,null,this.root)
    }

    get(i){
        return this._nodes[i]
    }

    toArray(){
		return [...this._nodes]
	}

    toDom(){
        const makeDom=({type:name,props:attribs,children=[]},parent)=>{
            const node={
                type:"tag",
                name,
                attribs,
                prev:null,
                next:null,
                parent
            }
            node.children=children.map(a=>makeDom(a,node)).map(function(a,i,me){a.prev=me[i-1];a.next=me[i+1];return a})
            return node
        }
        return cheerio.load(this._nodes.map(a=>makeDom(TestRenderer.create(a).toJSON())),{xmlMode:true})
    }
}

function traverse(el, f, right=false,self=true){
    if(!React.isValidElement(el))
        return

    if(self && f(el))
        return el

    if(typeof(el.props.children)=="string")
        return

    const children=Children.toArray(el.props.children)
    if(typeof(children[0])=="string")
        return

    if(children.length>0){
        return !!children[`find${right ? "Last" :""}`](child=>{
            let result=f(child,el)
            if(result===true){
                return true
            }else if(result===false){
                return false
            }else{
                return !!traverse(child,f,right, false)
            }
        })
    }
}
