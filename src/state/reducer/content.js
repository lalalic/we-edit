import {List} from "immutable"
import Query from "state/selector/query"
import {getFile} from "state/selector"

export default class Content extends Query{
    constructor(){
        super(...arguments)
        this._doc=getFile(this.state)
    }

	_getContent(){
		return this.state.get("_content")
	}

    attr(k,value){
        if(k==undefined){
            if(this.length){
                return this._content.get(this._nodes[0])
            }
        }else if(value==undefined)
            return super.attr(k)
        else{
            if(this.length){
    			let path=[this._nodes[0]]
    			if(["type","id","parent","children"].includes(k)){
    				path.push(k)
    			}else{
    				path.push("props")
    				path.push(k)
    			}
    			this._content.setIn(path,value)
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
                    let updated=c.setIn([id,"children"],value)
                    this._doc.updateNode(updated.get(id).toJS(),this)
                    return updated
                },this._content)
			return this
        }
    }

	append(nodes){
		let id0=this.attr("id")
		let docNode=this._doc.getNode(id0);
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

			docNode.append(this._doc.getNode(id))
		})
		return this
	}

	appendTo(parent){
		new this.constructor(this.state, parent).append(this)
		return this
	}

	prepend(node){
		let id0=this.attr("id")
		let docNode=this._doc.getNode(id0);
		(new this.constructor(this.state,nodes))._nodes.reverse()
		.forEach(id=>{
			if(this._content.hasIn([id0,"children"]))
				this._content.updateIn([id0,"children"],c=>c.unshift(id))

			if(this._content.hasIn([id,"parent"]))
				this._content.updateIn([this._content.getIn([id,"parent"]),"children"],c=>c.delete(c.indexOf(id)))


			if(this._content.has(id))
				this._content.setIn([id,"parent"],id0)
			docNode.append(this._doc.getNode(id))
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
		let docNode=this._doc.getNode(this.attr("id"))
		let index=parent.get(0).get("children").indexOf(this.attr("id"))+1
		new this.constructor(this.state,nodes)._nodes
    		.forEach((k,i)=>{
    			if(this._content.hasIn([k,"parent"]))
    				this._content.updateIn([this._content.getIn([k,"parent"]),"children"],c=>c.delete(c.indexOf(k)))

    			this._content.setIn([k,"parent"],pid)
    			this._content.updateIn([pid,"children"],c=>c.insert(index+i,k))
    			docNode.after(this._doc.getNode(k))
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
		let docNode=this._doc.getNode(this.attr("id"))
		let index=parent.get(0).get("children").indexOf(this.attr("id"))
		new this.constructor(this.state,nodes)
		._nodes.reverse()
		.forEach((k,i)=>{
			if(this._content.hasIn([k,"parent"]))
				this._content.updateIn([this._content.getIn([k,"parent"]),"children"],c=>c.delete(c.indexOf(k)))

			this._content.setIn([k,"parent"],pid)
			this._content.updateIn([pid,"children"],c=>c.insert(index,k))
			docNode.before(this._doc.getNode(k))
		})
		return this
	}

	insertBefore(node){
		new this.constructor(this.state,node).before(this)
		return this
	}

	remove(deep=true){
		const clear=k=>{//clear the tree
			this._content.remove(k)
			if(!deep)
				return
			let children=this._content.getIn([k,"children"])
			if(children instanceof List){
				children.forEach(id=>clear(id))
			}
		}
		this._nodes.forEach(k=>{
			let node=this._content.get(k)
			this._doc.removeNode(node.toJS())
			this._content.updateIn([node.get("parent"),"children"],c=>c.delete(c.indexOf(k)))
			clear(k)
		})
		return this
	}

	constructUp(to){
		return this._doc.construct(this.attr("id"), new this.constructor(this.state,to).attr("id"))
	}
}
