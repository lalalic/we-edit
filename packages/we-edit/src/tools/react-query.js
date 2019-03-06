import React, {Children} from "react"
import "./array-find-last"
import cssSelector from "./css"

const toArray=children=>Array.isArray(children) ? children : [children]

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

	attr(k,v){
		switch(arguments.length){
		case 2:{
			if(this.length){
				const element=this._nodes[0]
				switch(k){
				case "type":
					return this
				break
				default:
					return this.replace(element,React.cloneElement(element,{[k]:v}))
				}
			}else{
				return this
			}
		}
		default:
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
	}

	replace(element, changed){
        if(element instanceof Query){
            element=element.get(0)
        }
        if(changed instanceof Query){
            changed=changed.get(0)
        }
		console.assert(React.isValidElement(element))
		console.assert(React.isValidElement(changed))
		const {first,parents}=new this.constructor(this.root).findFirstAndParents(a=>a==element||undefined)
        console.assert(first.get(0)==element)
        console.assert(parents.length>0)
        const root=parents.reduceRight(({origin,cloned},parent)=>{
            const children=[...toArray(parent.props.children)]
			switch(children.length){
			case 1:
				return {
					cloned:React.cloneElement(parent,{},cloned),
					origin:parent,
				}
			default:
				let i=children.indexOf(origin)
				children.splice(i,1,cloned)
				return {
					origin:parent,
					cloned:React.cloneElement(parent,{children}),
				}
			}

		},{origin:element,cloned:changed}).cloned
		return new this.constructor(root)
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
                    let result=select(...arguments)
                    if(!!result){
                        found=a
                    }
                    return result
                })
            }
        }
        return new this.constructor(found,null,this.root)
    }

	findFirstAndParents(test){
        test=this._asSelector(test)
		const parents=[]
		const first=this.findFirst((a,parent)=>{
			if(parent){
				let i=parents.indexOf(parent)
				if(i!=-1)
					parents.splice(i)
				parents.push(parent)
			}

			return test(a,parents)
		})
		if(first.length==0)
			parents.splice(0)
		return {first, parents}
	}

    findLast(selector){
        const select=this._asSelector(selector)
        var found=null
        for(let len=this._nodes.length,i=len-1;i>=0;i--){
            if(!found){
                traverse(this._nodes[i],function(a){
                    let result=select(...arguments)
                    if(!!result){
                        found=a
                    }
                    return result
                },true)
            }
        }
        return new this.constructor(found,null,this.root)
    }

    findLastAndParents(test){
        test=this._asSelector(test)
        const parents=[]
		const last=this.findLast((a,parent)=>{
			if(parent){
				let i=parents.indexOf(parent)
				if(i!=-1)
					parents.splice(i)
				parents.push(parent)
			}

			return test(a,parents)
		})
		if(last.length==0)
			parents.splice(0)
		return {last, parents}
    }

    eq(i){
        return new this.constructor([this._nodes[i]],null,this.root)
    }

    get(i){
        return this._nodes[i]
    }

    toArray(){
		return [...this._nodes]
	}
}

function traverse(el, f, right=false,self=true){
    if(!React.isValidElement(el))
        return

    if(self){
        let result=f(el)
        if(result===true){
            return true
        }else if(result===false){
            return false
        }
    }

    if(typeof(el.props.children)=="string")
        return

    const children=toArray(el.props.children).filter(a=>!!a)
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
