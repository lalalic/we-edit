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
			clear(k)
		})
		return this
	}

	constructUp(to){
		let docNode=this.file.construct(this.attr("id"), this.closest(to).attr("id"))
        let {id}=this.file.renderChanged(docNode)
        return new this.constructor(this.state, [id])
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

    nextCursorable(){
        return this.forwardFirst(node=>node.children==undefined || typeof(node.children)=="string")
    }

    prevCursorable(){
        return this.backwardFirst(node=>node.children==undefined || typeof(node.children)=="string")
    }

	toString(){
		return this._nodes.map(id=>this.file.toString(id)).join("\r\n")
	}
}
