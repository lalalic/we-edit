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
				found.add(node.get("id"))
			return found
		},new Set())
		return new this.constructor(this.state,Array.from(found))
	}

	parents(selector){
		let select=asSelector(selector,this._$)
		let found=this._nodes.reduce((found,id)=>{
			let node=this._content.get(id)
			while(node && node.has("parent") && (node=this._content.get(node.get("parent")))){
				if(select(node))
					found.add(node.get("id"))
			}
			return found
		},new Set())
		return new this.constructor(this.state,Array.from(found))
	}

	parentsUntil(selector=()=>false){
		let select=asSelector(selector,this._$)
		let found=this._nodes.reduce((found,id)=>{
			let node=this._content.get(id)
			while(node && node.has("parent") && (node=this._content.get(node.get("parent")))){
				if(select(node)){
					break
				}else{
					found.add(node.get("id"))
				}
			}
			return found
		},new Set())
		return new this.constructor(this.state,Array.from(found))
	}

	closest(selector){
		let select=asSelector(selector,this._$)
		let found=this._nodes.reduce((found,id)=>{
			let node=this._content.get(id)
			while(node){
				if(select(node)){
					found.add(node.get("id"))
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
		},new Set())
		return new this.constructor(this.state,Array.from(found))
	}

	next(selector){
		let select=asSelector(selector,this._$)
		let found=this._nodes.reduce((found,id)=>{
			let node=this._content.get(id)
			if(node && node.has("parent")){
				let siblings=this._content.getIn([node.get("parent"),"children"])
				if(siblings){
					let index=siblings.indexOf(id)
					if(index<siblings.size-1){
						++index
						if(select(this._content.get(siblings.get(index)))){
							found.add(siblings.get(index))
						}
					}
				}
			}
			return found
		},new Set())
		return new this.constructor(this.state,Array.from(found))
	}

	nextAll(selector){
		let select=asSelector(selector,this._$)
		let found=this._nodes.reduce((found,id)=>{
			let node=this._content.get(id)
			if(node && node.has("parent")){
				let siblings=this._content.getIn([node.get("parent"),"children"])
				if(siblings){
					for(let i=siblings.indexOf(id)+1;i<siblings.size;i++){
						if(select(this._content.get(siblings.get(i)))){
							found.add(siblings.get(i))
						}
					}
				}
			}
			return found
		},new Set())
		return new this.constructor(this.state,Array.from(found))
	}

	nextUntil(selector){
		let select=asSelector(selector,this._$)
		let found=this._nodes.reduce((found,id)=>{
			let node=this._content.get(id)
			if(node && node.has("parent")){
				let siblings=this._content.getIn([node.get("parent"),"children"])
				if(siblings){
					for(let i=siblings.indexOf(id)+1;i<siblings.size;i++){
						if(select(this._content.get(siblings.get(i)))){
							break
						}else{
							found.add(siblings.get(i))
						}
					}
				}
			}
			return found
		},new Set())
		return new this.constructor(this.state,Array.from(found))
	}

	forwardFirst(selector){
		let select=asSelector(selector,this._$)
		let found=this._nodes.reduce((found,k)=>{
			traverseNext(this._content,node=>{
				if(!!select(node)){
					found.add(node.get("id"))
					return true
				}
			},k)
			return found
		},new Set())
		return new this.constructor(this.state,Array.from(found))
	}

	forwardUntil(selector=()=>false){
		let select=asSelector(selector,this._$)
		let found=this._nodes.reduce((found,k)=>{
			traverseNext(this._content,node=>{
				if(!!select(node)){
					return true
				}else{
					found.add(node.get("id"))
				}
			},k)
			return found
		},new Set())
		return new this.constructor(this.state,Array.from(found))
	}

	prev(selector){
		let select=asSelector(selector,this._$)
		let found=this._nodes.reduce((found,id)=>{
			let node=this._content.get(id)
			if(node && node.has("parent")){
				let siblings=this._content.getIn([node.get("parent"),"children"])
				if(siblings){
					let index=siblings.indexOf(id)
					if(index>0){
						--index
						if(select(this._content.get(siblings.get(index)))){
							found.add(siblings.get(index))
						}
					}
				}
			}
			return found
		},new Set())
		return new this.constructor(this.state,Array.from(found))
	}

	prevAll(selector){
		let select=asSelector(selector,this._$)
		let found=this._nodes.reduce((found,id)=>{
			let node=this._content.get(id)
			if(node && node.has("parent")){
				let siblings=this._content.getIn([node.get("parent"),"children"])
				if(siblings){
					for(let i=0,end=siblings.indexOf(id);i<end;i++){
						if(select(this._content.get(siblings.get(i)))){
							found.add(siblings.get(i))
						}
					}
				}
			}
			return found
		},new Set())
		return new this.constructor(this.state,Array.from(found))
	}

	prevUntil(selector){
		let select=asSelector(selector,this._$)
		let found=this._nodes.reduce((found,id)=>{
			let node=this._content.get(id)
			if(node && node.has("parent")){
				let siblings=this._content.getIn([node.get("parent"),"children"])
				if(siblings){
					for(let i=0,end=siblings.indexOf(id);i<end;i++){
						if(select(this._content.get(siblings.get(i)))){
							break
						}else{
							found.add(siblings.get(i))
						}
					}
				}
			}
			return found
		},new Set())
		return new this.constructor(this.state,Array.from(found))
	}

	backwardFirst(selector){
		let select=asSelector(selector,this._$)
		let found=this._nodes.reduce((found,k)=>{
			traversePrev(this._content,node=>{
				if(!!select(node)){
					found.add(node.get("id"))
					return true
				}
			},k)
			return found
		},new Set())
		return new this.constructor(this.state,Array.from(found))
	}


	backwardUntil(selector=()=>false){
		let select=asSelector(selector,this._$)
		let found=this._nodes.reduce((found,k)=>{
			traversePrev(this._content,node=>{
				if(!!select(node)){
					return true
				}else{
					found.add(node.get("id"))
				}
			},k)
			return found
		},new Set())
		return new this.constructor(this.state,Array.from(found))
	}

	
	to(dest){
		const target0=this, target1=this._$(dest)
		const targets=[]
        
        const ancestor=target0.parentsUntil(target1.parentsUntil()).last().parent()
        if(ancestor.length>0){
            let ancestors0=target0.parentsUntil(ancestor)
            if(ancestors0.length==0){
                ancestors0=ancestors0.add(target0)
            }
            let ancestors1=target1.parentsUntil(ancestor)
            if(ancestors1.length==0){
                ancestors1=ancestors1.add(target1)
            }
            const top0=ancestors0.last()
            const top1=ancestors1.last()

			
			
            ancestors0.not(target0).not(top0).each((i,a)=>{
                targets.splice(targets.length,0,...this._$('#'+a.get("id")).nextAll().toArray())
			})

			targets.splice(targets.length,0,...top0.nextUntil(top1).toArray())
			
            ancestors1.not(target1).not(top1).each((i,a)=>{
                targets.splice(targets.length,0,...this.$('#'+a.get("id")).prevAll().toArray())
            })
		}
		targets.splice(0,0,target0.attr("id"))

        targets.splice(targets.length,0, target1.attr("id"))
		
		return this._$(Array.from(new Set(targets)))
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
					found.add(node.get("id"))
				}
			},k)
			return found
		},new Set())
		return new this.constructor(this.state,Array.from(found))
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
	closestEnd(to){
		debugger
		const top=this.closest(to)
		const parents=this.add(this.parentsUntil(top)).add(top)
		const i=parents.toArray().findIndex(id=>{
			const parent=this._content.getIn([id,"parent"])
			if(parent){
				const children=this._content.getIn([parent,"children"]).toJS()
				return children[children.length-1]!=id
			}
			return false
		})

		return i==-1 ? parents.last() : parents.eq(i)
	}

	closestStart(to){
		const top=this.closest(to)
		const parents=this.add(this.parentsUntil(top)).add(top)
		const i=parents.toArray().findIndex(id=>{
			const parent=this._content.getIn([id,"parent"])
			if(parent){
				const children=this._content.getIn([parent,"children"]).toJS()
				return children[0]!=id
			}
			return false
		})

		return i==-1 ? parents.last() : parents.eq(i)
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

	toJS(){
		const content=this._getContent()
		const extract=id=>{
			if(content.has(id)){
				const {id:_, parent, children, ...node}=content.get(id).toJS()
				if(Array.isArray(children)){
					node.children=children.map(a=>extract(a)).filter(a=>!!a)
				}else{
					node.children=children
				}
				return node
			}
			return null
		}

		if(this._nodes.length>0){
			return extract(this._nodes[0])
		}

		return {}
	}

	toString(){
		return JSON.stringify(this.map((i,node,$)=>$(node).toJS()),null, 4)
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
