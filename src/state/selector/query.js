import {Map,List} from "immutable"
import {traverse, traverseNext, traversePrev}  from "."

export default class Query{
	constructor(content,selector){
		this._content=content
		this._nodes=[]
		if(!selector){
			this._nodes.push('root')
			return this
		}
		
		//$($)
		if(selector instanceof Query){
			return selector
		}else
		
		//$({type...})
		if(isNode(selector)){
			selector=[selector]
		}
		
		//$([{}]
		if(Array.isArray(selector)){
			selector.forEach(a=>{
				if(isNode(a)){
					this._nodes.push(content.keyOf(a))
				}else if(typeof(a)=="string"){//id
					this._nodes.push(a)
				}
			})
			return this
		}
		
		if(typeof(selector)=="string"){
			return this.find(selector)
		}
	}
	
	get length(){
		return this._nodes.length
	}
	
	
	attr(k){
		if(this.length){
			return this._content.getIn(`${this_nodes[0]}.${k}`)
		}else{
			return null
		}
	}
	
	parent(selector){
		let select=asSelector(selector)
		let found=this._nodes.reduce((found,id)=>{
			let node=this._content.get(id)
			if(node && node.has("parent") && select(node,id))
				found.push(node.get("parent"))
			return found
		},[])
		return new this.constructor(this._content,found)
	}
	
	parents(selector){
		let select=asSelector(selector)
		let found=this._nodes.reduce((found,id)=>{
			let node=this._content.get(id)
			while(node && node.has("parent")){
				if(select(node,id))
					found.push(node.get("parent"))
				id=node.get("parent")
				node=this._content.get(id)
			}
			return found
		},[])
		return new this.constructor(this._content,found)
	}
	
	parentsUntil(selector){
		let select=asSelector(selector)
		let found=this._nodes.reduce((found,id)=>{
			let node=this._content.get(id)
			while(node && node.has("parent")){
				if(select(node,id)){
					break 
				}else{
					found.push(node.get("parent"))
				}
				id=node.get("parent")
				node=this._content.get(id)
			}
			return found
		},[])
		return new this.constructor(this._content,found)
	}
	
	closest(selector){
		let select=asSelector(selector)
		let found=this._nodes.reduce((found,id)=>{
			let node=this._content.get(id)
			while(node && node.has("parent")){
				if(select(node,id)){
					found.push(node.get("parent"))
					break 
				}
				id=node.get("parent")
				node=this._content.get(id)
			}
			return found
		},[])
		return new this.constructor(this._content,found)
	}
	
	nextAll(selector){
		let select=asSelector(selector)
		let found=this._nodes.reduce((found,id)=>{
			let node=this._content.get(id)
			if(node && node.has("parent")){
				let siblings=this._content.getIn(`${node.get("parent")}.children`)
				for(let i=siblings.indexOf(id)+1;i<siblings.length;i++){
					if(select(this._content.get(siblings[i]),siblings[i])){
						found.push(siblings[i])
					}
				}
			}
			return found
		},[])
		return new this.constructor(this._content,found)
	}
	
	prevAll(selector){
		let select=asSelector(selector)
		let found=this._nodes.reduce((found,id)=>{
			let node=this._content.get(id)
			if(node && node.has("parent")){
				let siblings=this._content.getIn(`${node.get("parent")}.children`)
				for(let i=0,end=siblings.indexOf(id);i<end;i++){
					if(select(this._content.get(siblings[i]),siblings[i])){
						found.push(siblings[i])
					}
				}
			}
			return found
		},[])
		return new this.constructor(this._content,found)
	}
	
	next(selector){
		let select=asSelector(selector)
		let found=this._nodes.reduce((found,id)=>{
			let node=this._content.get(id)
			if(node && node.has("parent")){
				let siblings=this._content.getIn(`${node.get("parent")}.children`)
				let index=siblings.indexOf(id)
				if(index<siblings.length-1){
					++index
					if(select(this._content.get(siblings[index]),siblings[index])){
						found.push(siblings[index])
					}
				}
			}
			return found
		},[])
		return new this.constructor(this._content,found)
	}
	
	prev(selector){
		let select=asSelector(selector)
		let found=this._nodes.reduce((found,id)=>{
			let node=this._content.get(id)
			if(node && node.has("parent")){
				let siblings=this._content.getIn(`${node.get("parent")}.children`)
				let index=siblings.indexOf(id)
				if(index>0){
					--index
					if(select(this._content.get(siblings[index]),siblings[index])){
						found.push(siblings[index])
					}
				}
			}
			return found
		},[])
		return new this.constructor(this._content,found)
	}
	
	nextUntil(selector){
		let select=asSelector(selector)
		let found=this._nodes.reduce((found,k)=>{
			traverseNext(this._content,(node,id)=>{
				if(!!selector(node,id)){
					return true
				}else{
					found.push(id)
				}
			},k)
			return found
		},[])
		return new this.constructor(this._content,found)
	}
	
	prevUntil(selector){
		let select=asSelector(selector)
		let found=this._nodes.reduce((found,k)=>{
			traversePrev(this._content,(node,id)=>{
				if(!!selector(node,id)){
					return true
				}else{
					found.push(id)
				}
			},k)
			return found
		},[])
		return new this.constructor(this._content,found)
	}
	
	children(selector){
		let select=asSelector(selector)
		let found=this._nodes.reduce((found,k)=>{
			let children=this._content.getIn(`${id}.children`)
			if(children && children instanceof List){
				children.forEach(a=>{
					if(select(this._content.get(a),a)){
						found.push(a)
					}
				})
			}
			return found
		},[])
		return new this.constructor(this._content,found)
	}
	
	find(selector){
		let select=asSelector(selector)
		let found=this._nodes.reduce((found,k)=>{
			traverse(this._content,(node,id)=>{
				if(!!selector(node,id)){
					found.push(id)
				}
			},k)
			return found
		},[])
		return new this.constructor(this._content,found)
	}
	
	findFirst(selector){
		let select=asSelector(selector)
		let found=this._nodes.reduce((found,k)=>{
			traverse(this._content,(node,id)=>{
				if(!!selector(node,id)){
					found.push(id)
					return true
				}
			},k)
			return found
		},[])
		return new this.constructor(this._content,found)
	}
	
	findLast(selector){
		let select=asSelector(selector)
		let found=this._nodes.reduce((found,k)=>{
			let kFound=[]
			traverse(this._content,(node,id)=>{
				if(!!selector(node,id)){
					kFound.push(id)
				}
			},k)
			if(kFound.length){
				found.push(kFound.pop())
			}
			return found
		},[])
		return new this.constructor(this._content,found)
	}
	
	filter(selector){
		let select=asSelector(selector)
		let found=this._nodes.filter(k=>select(this._content.get(k),k))
		return new this.constructor(this._content,found)
	}
	
	not(selector){
		let select=asSelector(selector)
		let found=this._nodes.filter(k=>!select(this._content.get(k),k))
		return new this.constructor(this._content,found)
	}
	
	first(){
		return new this.constructor(this._content,this._nodes.slice(0,1))
	}
	
	last(){
		return new this.constructor(this._content,this._nodes.slice(this.nodes.length-1))
	}
	
	eq(i){
		return new this.constructor(this._content,this._nodes.slice(i,i+1))
	}
	
	get(i){
		return this._content.get(this._nodes[i])
	}
	
	has(selector){
		let select=asSelector(selector)
		return !!this._nodes.find(k=>select(this._content.get(k),k))
	}
}


const isNode=a=>a instanceof Map

function asSelector(selector){
	switch(typeof(selector)){
		case "function":{
			return selector
		}
		case "object":{
			if(selector instanceof Query){
				return node=>selector.has(node)
			}else if(selector instanceof Map){
				return node=>node==selector
			}
			break
		}
		case "string":{//#id,type,[a=b]
			//any true would true
			return (n,k)=>selector.split(",")
				.map(a=>{
					//any false would false
					return (n,k)=>!a.split(/(?=[#\[\]])/g)
						.map(k=>{
							if(k[0]=="]"){
								return k.substr(1)	
							}
							return k
						}).filter(a=>!!a)
						.map(k=>{
							switch(k[0]){
								case '#':{
									let id=k.substr(1)
									return (n,k)=>k==id
								}
								case '[':{
									let [k,v]=k.substr(1).split("=")
									return n=>{
										if(n.has(k)){
											if(typeof(v)=='undefined'){
												return true
											}else{
												v=v.replace(/^['"]/).replace(/$['"]/)
												return n.getIn(`props.${k}`)==v
											}
										}
										return false
									}
								}
								default:{
									return n=>n.get("type")==k
								}
							}
						}).find(f=>!f(n,k))
				}).find(f=>f(n,k))
			break
		}
		default:
			return a=>true
	}
}