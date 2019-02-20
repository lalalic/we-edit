import {Map,List} from "immutable"
import {traverse, traverseNext, traversePrev}  from "."
import cssSelect, {isIdSelector} from "../../tools/css"

const isNode=a=>a instanceof Map

export default class Query{
	static fromContent(content,selector){
		return new Query({get:a=>content},selector)
	}

	constructor(state,selector){
		this.state=state
		this._content=this._getContent()
		this._nodes=[]
		this._$=n=>new this.constructor(state,[n])
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
					this._nodes.push(a.get("id"))
				}else if(typeof(a)=="string"){//id
					this._nodes.push(a)
				}
			})
			return this
		}else

		if(typeof(selector)=="string" && selector!="root"){
			this._nodes.push('root')
			return this.find(selector)
		}
	}



	get length(){
		return this._nodes.length
	}

	_getContent(){
		return this.state.get("content")
	}

	props(){
		if(this.length){
			return this._content.get(this._nodes[0])
		}else{
			return null
		}
	}

	attr(k){
		if(this.length){
			let path=[this._nodes[0]]
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

	parent(selector){
		let select=asSelector(selector,this._$)
		let found=this._nodes.reduce((found,id)=>{
			let node=this._content.get(id)
			if(node && node.has("parent") && select(node=this._content.get(node.get("parent"))))
				found.push(node.get("id"))
			return found
		},[])
		return new this.constructor(this.state,found)
	}

	parents(selector){
		let select=asSelector(selector,this._$)
		let found=this._nodes.reduce((found,id)=>{
			let node=this._content.get(id)
			while(node && node.has("parent") && (node=this._content.get(node.get("parent")))){
				if(select(node))
					found.push(node.get("id"))
			}
			return found
		},[])
		return new this.constructor(this.state,found)
	}

	parentsUntil(selector=()=>false){
		let select=asSelector(selector,this._$)
		let found=this._nodes.reduce((found,id)=>{
			let node=this._content.get(id)
			while(node && node.has("parent") && (node=this._content.get(node.get("parent")))){
				if(select(node)){
					break
				}else{
					found.push(node.get("id"))
				}
			}
			return found
		},[])
		return new this.constructor(this.state,found)
	}

	closest(selector){
		let select=asSelector(selector,this._$)
		let found=this._nodes.reduce((found,id)=>{
			let node=this._content.get(id)
			while(node){
				if(select(node)){
					found.push(node.get("id"))
					break
				}
				if(node.has("parent")){
					id=node.get("parent")
					node=this._content.get(id)
				}else{
					break
				}
			}
			return found
		},[])
		return new this.constructor(this.state,found)
	}

	next(selector){
		let select=asSelector(selector,this._$)
		let found=this._nodes.reduce((found,id)=>{
			let node=this._content.get(id)
			if(node && node.has("parent")){
				let siblings=this._content.getIn([node.get("parent"),"children"])
				let index=siblings.indexOf(id)
				if(index<siblings.size-1){
					++index
					if(select(this._content.get(siblings.get(index)))){
						found.push(siblings.get(index))
					}
				}
			}
			return found
		},[])
		return new this.constructor(this.state,found)
	}

	nextAll(selector){
		let select=asSelector(selector,this._$)
		let found=this._nodes.reduce((found,id)=>{
			let node=this._content.get(id)
			if(node && node.has("parent")){
				let siblings=this._content.getIn([node.get("parent"),"children"])
				for(let i=siblings.indexOf(id)+1;i<siblings.size;i++){
					if(select(this._content.get(siblings.get(i)))){
						found.push(siblings.get(i))
					}
				}
			}
			return found
		},[])
		return new this.constructor(this.state,found)
	}

	nextUntil(selector){
		let select=asSelector(selector,this._$)
		let found=this._nodes.reduce((found,id)=>{
			let node=this._content.get(id)
			if(node && node.has("parent")){
				let siblings=this._content.getIn([node.get("parent"),"children"])
				for(let i=siblings.indexOf(id)+1;i<siblings.size;i++){
					if(select(this._content.get(siblings.get(i)))){
						break
					}else{
						found.push(siblings.get(i))
					}
				}
			}
			return found
		},[])
		return new this.constructor(this.state,found)
	}

	forwardFirst(selector){
		let select=asSelector(selector,this._$)
		let found=this._nodes.reduce((found,k)=>{
			traverseNext(this._content,node=>{
				if(!!select(node)){
					found.push(node.get("id"))
					return true
				}
			},k)
			return found
		},[])
		return new this.constructor(this.state,found)
	}

	forwardUntil(selector=()=>false){
		let select=asSelector(selector,this._$)
		let found=this._nodes.reduce((found,k)=>{
			traverseNext(this._content,node=>{
				if(!!select(node)){
					return true
				}else{
					found.push(node.get("id"))
				}
			},k)
			return found
		},[])
		return new this.constructor(this.state,found)
	}

	prev(selector){
		let select=asSelector(selector,this._$)
		let found=this._nodes.reduce((found,id)=>{
			let node=this._content.get(id)
			if(node && node.has("parent")){
				let siblings=this._content.getIn([node.get("parent"),"children"])
				let index=siblings.indexOf(id)
				if(index>0){
					--index
					if(select(this._content.get(siblings.get(index)))){
						found.push(siblings.get(index))
					}
				}
			}
			return found
		},[])
		return new this.constructor(this.state,found)
	}

	prevAll(selector){
		let select=asSelector(selector,this._$)
		let found=this._nodes.reduce((found,id)=>{
			let node=this._content.get(id)
			if(node && node.has("parent")){
				let siblings=this._content.getIn([node.get("parent"),"children"])
				for(let i=0,end=siblings.indexOf(id);i<end;i++){
					if(select(this._content.get(siblings.get(i)))){
						found.push(siblings.get(i))
					}
				}
			}
			return found
		},[])
		return new this.constructor(this.state,found)
	}

	prevUntil(selector){
		let select=asSelector(selector,this._$)
		let found=this._nodes.reduce((found,id)=>{
			let node=this._content.get(id)
			if(node && node.has("parent")){
				let siblings=this._content.getIn([node.get("parent"),"children"])
				for(let i=0,end=siblings.indexOf(id);i<end;i++){
					if(select(this._content.get(siblings.get(i)))){
						break
					}else{
						found.push(siblings.get(i))
					}
				}
			}
			return found
		},[])
		return new this.constructor(this.state,found)
	}

	backwardFirst(selector){
		let select=asSelector(selector,this._$)
		let found=this._nodes.reduce((found,k)=>{
			traversePrev(this._content,node=>{
				if(!!select(node)){
					found.push(node.get("id"))
					return true
				}
			},k)
			return found
		},[])
		return new this.constructor(this.state,found)
	}


	backwardUntil(selector=()=>false){
		let select=asSelector(selector,this._$)
		let found=this._nodes.reduce((found,k)=>{
			traversePrev(this._content,node=>{
				if(!!select(node)){
					return true
				}else{
					found.push(node.get("id"))
				}
			},k)
			return found
		},[])
		return new this.constructor(this.state,found)
	}

	children(selector){
		let select=asSelector(selector,this._$)
		let found=this._nodes.reduce((found,k)=>{
			let children=this._content.getIn([k,"children"])
			if(children && children instanceof List){
				children.forEach(a=>{
					if(select(this._content.get(a))){
						found.push(a)
					}
				})
			}
			return found
		},[])
		return new this.constructor(this.state,found)
	}

	find(selector){
		if(isIdSelector(selector)){
			return this.findFirst(selector)
		}
		let select=asSelector(selector,this._$)
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

	findFirst(selector, includeSelf=false, right=false){
		if(isIdSelector(selector) && this._nodes.includes("root")){
			let id=selector.substr(1)
			return new this.constructor(this.state, this._content.has(id) ?[id] : [])
		}
		let select=asSelector(selector,this._$)
		let found=this._nodes.reduce((found,k)=>{
			if(found.length>0)
				return found

			if(includeSelf && !!select(this._content.get(k))){
				found.push(k)
				return found
			}

			traverse(this._content,node=>{
				if(!!select(node)){
					found.push(node.get("id"))
					return true
				}
			},k, right)
			return found
		},[])
		return new this.constructor(this.state,found)
	}

	findLast(selector, includeSelf){
		return this.find(selector, includeSelf, true).last()
	}

	filter(selector){
		let select=asSelector(selector,this._$)
		let found=this._nodes.filter(k=>select(this._content.get(k)))
		return new this.constructor(this.state,found)
	}

	slice(from,to){
		return new this.constructor(this.state,this._nodes.slice(from,to))
	}

	not(selector){
		let select=asSelector(selector,this._$)
		let found=this._nodes.filter(k=>!select(this._content.get(k)))
		return new this.constructor(this.state,found)
	}

	first(){
		return new this.constructor(this.state,this._nodes.slice(0,1))
	}

	last(){
		return new this.constructor(this.state,this._nodes.slice(-1))
	}

	eq(i){
		return new this.constructor(this.state,this._nodes.slice(i,i+1))
	}

	get(i){
		return this._content.get(this._nodes[i])
	}

	has(selector){
		let select=asSelector(selector,this._$)
		return this._nodes.findIndex(k=>select(this._content.get(k)))!=-1
	}

	is(selector){
		let select=asSelector(selector,this._$)
		return this._nodes.findIndex(k=>!select(this._content.get(k)))==-1
	}

	each(f,context){
		this._nodes.forEach((id,i)=>{
			let node=this._content.get(id)
			f.bind(context||node)(i,node,this._$)
		})
		return this
	}

	map(f,context){
		let mapped=this._nodes.map((id,i)=>{
			let node=this._content.get(id)
			return f.bind(context||node)(i,node,this._$)
		}).filter(a=>!!a)
		if(mapped.length==0 || mapped.find(a=>!isNode(a))){
			return mapped
		}else{
			return new this.constructor(this.state, mapped)
		}
	}

	add(selector, at="push"){
		let nodes=[...this._nodes]
		new this.constructor(this.state,selector)._nodes.forEach(id=>{
			if(!nodes.includes(id))
				nodes[at](id)
		})
		return new this.constructor(this.state, nodes)
	}

	text(){
		return this._nodes.map(k=>{
			let node=this._content.get(k)
			if(node.get("type")=="text")
				return node.get("children")
			else
				return new this.constructor(this.state, [k])
					.find("text")
					.map((i,node)=>node.get("children"))
					.join("")
		}).join("")
	}

	toArray(){
		return [...this._nodes]
	}

	prevCursor(at){
		const current=new this.constructor(this.state,this._nodes.slice(0,1))
		if(current.attr('type')=="text" && at>0){
			return {id:current.attr('id'),at:at-1}
		}
		const prev=current.backwardFirst(a=>["undefined","string"].includes(typeof(a.children)))
		if(prev.length){
			if(prev.attr('type')=="text"){
				return {id:prev.attr('id'),at:prev.text().length-1}
			}else{
				return {id:prev.attr('id'),at:0}
			}
		}
		return {}
	}

	nextCursor(at){
		const current=new this.constructor(this.state,this._nodes.slice(0,1))
		if(current.attr('type')=="text" && at<current.text().length-1){
			return {id:current.attr('id'),at:at+1}
		}
		const prev=current.forwardFirst(a=>["undefined","string"].includes(typeof(a.children)))
		return prev.length ? {id:prev.attr('id'),at:0} : {}
	}
}

function asSelector(selector,$){
	switch(typeof(selector)){
		case "function":{
			return selector
		}
		case "object":{
			if(selector instanceof Query){
				return node=>selector.has(node)
			}else if(selector instanceof Map){
				return function(node){
					return node.get("id")==selector.get("id")
				}
			}else{
				throw new Error("not supported object selector")
			}
		}
		case "string":{
			return cssSelect(selector,$,{
				"#":id=>n=>n.get("id")==id,
				"[":(name,v)=>n=>{
					if(n.hasIn(["props",name])){
						if(typeof(v)=='undefined'){
							return true
						}else{
							v=v.replace(/^['"]/).replace(/$['"]/)
							return n.getIn(["props",name])==v
						}
					}
					return false
				},
				".":className=>n=>{
					if(n.hasIn(["props","className"])){
						return n.getIn(["props","className"]).split(/\s+/).includes(className)
					}
					return false
				},
				type:type=>n=>n.get("type")==type
			})
		}
		default:
			return a=>true
	}
}
