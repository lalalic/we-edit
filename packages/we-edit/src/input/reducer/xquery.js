import Immutable, {List} from "immutable"
import Query from "../../state/selector/query"
import {getFile} from "../../state/selector"

export default class xQuery extends Query{
    constructor(){
        super(...arguments)
        this.file=getFile(this.state)
    }

	//override
	_getContent(){
		return this.state.get("_content")
	}

    attr(k,value){
        if(k==undefined){
            if(this.length){
                return this._content.get(this._nodes[0])
            }
        }else if(value==undefined){
			if(typeof(k)=="string"){
				return super.attr(k)
			}else if(typeof(k)=="object"){
				Object.keys(k).forEach(key=>this.attr(key,k[key]))
			}
        }else{
            if(this.length){
    			let path=[this._nodes[0]]
    			if(["type","id","parent","children"].includes(k)){
    				path.push(k)
					this._content.setIn(path,value)
    			}else{
    				path.push("props")
    				path.push(k)
					this._content.setIn(path,Immutable.fromJS(value))
					this.file.updateNode(this._content.get(path[0]).toJS(),{[k]:value}, this)
    			}


    		}

            return this
        }
    }

    text(value){
        if(value==undefined)
            return super.text()
        else{
            this.filter("text")
				.add(this.find("text"))
				._nodes
				.reduce((c,id)=>{
                    c.setIn([id,"children"],value)
                    this.file.updateNode(c.get(id).toJS(),{children:value},this)
                    return c
                },this._content)
			return this
        }
    }

	append(nodes){
		let id0=this.attr("id")
		let docNode=this.file.getNode(id0);
		(new this.constructor(this.state,nodes))._nodes
		.forEach(id=>{
			//append to this's children
			if(this._content.hasIn([id0,"children"])){
				this._content.updateIn([id0,"children"],c=>c.push(id))
			}

			//remove from original parent
			if(this._content.hasIn([id,"parent"])){
				this._content.updateIn([this._content.getIn([id,"parent"]),"children"],c=>c.delete(c.indexOf(id)))
			}

			//change current's parent to this
			if(this._content.has(id)){
				this._content.setIn([id,"parent"],id0)
			}
			this.file.insertNodeBefore(this.file.getNode(id),null,docNode)
		})
		return this
	}

	appendTo(parent){
		new this.constructor(this.state, parent).append(this)
		return this
	}

	prepend(nodes){
		let id0=this.attr("id")
		let docNode=this.file.getNode(id0);
		(new this.constructor(this.state,nodes))._nodes.reverse()
		.forEach(id=>{
			if(this._content.hasIn([id0,"children"]))
				this._content.updateIn([id0,"children"],c=>c.unshift(id))

			if(this._content.hasIn([id,"parent"]))
				this._content.updateIn([this._content.getIn([id,"parent"]),"children"],c=>c.delete(c.indexOf(id)))


			if(this._content.has(id))
				this._content.setIn([id,"parent"],id0)

			this.file.insertNodeAfter(this.file.getNode(id),null,docNode)
		})
		return this
	}

	prependTo(parent){
		new this.constructor(this.state, parent).prepend(this)
		return this
	}

	after(nodes){
		let parent=this.parent()
		let pid=parent.attr("id")
		let docNode=this.file.getNode(this.attr("id"))
		const docParentNode=this.file.getNode(pid)
		let index=parent.get(0).get("children").indexOf(this.attr("id"))+1
		new this.constructor(this.state,nodes)._nodes
    		.forEach((k,i)=>{
    			if(this._content.hasIn([k,"parent"]))
    				this._content.updateIn([this._content.getIn([k,"parent"]),"children"],c=>c.delete(c.indexOf(k)))

    			this._content.setIn([k,"parent"],pid)
    			this._content.updateIn([pid,"children"],c=>c.insert(index+i,k))

				this.file.insertNodeAfter(this.file.getNode(k),docNode,docParentNode)
    		})
		return this
	}

	insertAfter(node){
		new this.constructor(this.state,node).after(this)
		return this
	}

	before(nodes){
		let parent=this.parent()
		let pid=parent.attr("id")
		let docNode=this.file.getNode(this.attr("id"))
		let docParentNode=this.file.getNode(pid)
		let index=parent.get(0).get("children").indexOf(this.attr("id"))
		new this.constructor(this.state,nodes)
		._nodes.reverse()
		.forEach((k,i)=>{
			if(this._content.hasIn([k,"parent"]))
				this._content.updateIn([this._content.getIn([k,"parent"]),"children"],c=>c.delete(c.indexOf(k)))

			this._content.setIn([k,"parent"],pid)
			this._content.updateIn([pid,"children"],c=>c.insert(index,k))

			this.file.insertNodeBefore(this.file.getNode(k),docNode,docParentNode)
		})
		return this
	}

	insertBefore(node){
		new this.constructor(this.state,node).before(this)
		return this
	}

	remove(deep=true){
		const clear=k=>{//clear the tree
			if(!deep){
                this._content.remove(k)
                return
            }

			let children=this._content.getIn([k,"children"])
			if(children instanceof List){
				children.forEach(id=>clear(id))
			}
            this._content.remove(k)
		}
		this._nodes.forEach(k=>{
            this.file.removeNode(this._content.get(k).toJS())
            let parentId=this._content.getIn([k,"parent"])
            let children=this._content.getIn([parentId,"children"])
            if(children instanceof List){
                let i=children.indexOf(k)
                if(i!=-1){
                    this._content.removeIn([parentId,"children",i])
                }
            }
			clear(k)
		})
		return this
	}

	constructUp(to){
		let docNode=this.file.construct({id:this.attr("id"),type:this.attr('type')}, this.closest(to).attr("id"))
        let {id}=this.file.renderChanged(this.file.getNode(docNode))
        return new this.constructor(this.state, [id])
	}

    splitUpTo(to,at=0){
        to=this.closest(to)

		if(to.length==0){
			return []
		}

		if(to.attr('id')==this.attr('id')){
			return [to]
		}

		const parent=to.parent()

		const to1=this.constructUp(to).insertAfter(to)

		const target1=to1.findLast(a=>new this.constructor(this.state, [a]).children().length==0)

		if(this.attr('type')=="text"){
			const text=this.text()
			target1.text(text.substr(at))
			this.text(text.substr(0,at))
		}

		const ancestors=this.parentsUntil(to)
		const ancestors1=target1.parentsUntil(to1)
		console.assert(ancestors.length==ancestors1.length)
		ancestors.each(i=>{
			ancestors1.eq(i).after(ancestors.eq(i).nextAll())
		})

        return [to,to1]
    }

    clone(){
		let nodes=this._nodes.map(a=>{
			let node=this.file.cloneNode({id:a,type:this._content.getIn([a,"type"])})
			let {id}=this.file.renderChanged(node)
			return id
		})
		return new this.constructor(this.state,nodes)
	}

    tailor(from=0,to){
        if(this.attr('type')=="text"){
            const text=this.text()
            from=from<0 ? text.length+from : from
    		to=to==undefined ? text.length-1 : (to<0 ? text.length+to : to)
            this.text(text.substring(0,from)+text.substring(to))
            return this
        }
        return this.remove()
    }

    nextCursorable(at){
        if(arguments.length>0){
            if(this.attr('type')=="text"){
                if(at<this.text().length-1){
                    return {id:this.attr('id'),at:at+1}
                }else{
                    const next=this.forwardFirst(Cursorable)
                    if(next.length){
                        return {id:next.attr('id'), at:0}
                    }
                }
            }
            return {id:this.attr('id'),at}
        }

        return this.forwardFirst(Cursorable)
    }

    prevCursorable(at){
        if(arguments.length>0){
            if(this.attr('type')=="text"){
                if(at>0){
                    return {id:this.attr('id'),at:at-1}
                }else{
                    const prev=this.backwardFirst(Cursorable)
                    if(prev.length){
                        if(prev.attr('type')=="text"){
                            return {id:prev.attr('id'),at:Math.max(0,prev.text().length-1)}
                        }else{
                            return {id:prev.attr('id'),at:1}
                        }
                    }
                }
            }
            return {id:this.attr('id'), at}
        }
        return this.backwardFirst(Cursorable)
    }

	toString(){
		return this._nodes.map(id=>this.file.toString(id)).join("\r\n")
	}
}
const Cursorable=node=>node.children==undefined || typeof(node.children)=="string"
