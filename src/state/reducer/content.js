import {List} from "immutable"
import Query from "state/selector/query"
import {getFile} from "state/selector"

export default class Content extends Query{
    constructor(){
        super(...arguments)
		this._content=this.state.get("_content")
        this._doc=getFile(this.state)
    }
	
    attr(k,value){
        if(value==undefined)
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
                    this._doc.updateNode(c.get(id).toJS(),{children:value})
                    return c.setIn([id,"children"],value)
                },this._content)
			return this
        }
    }

	append(nodes){
		let id0=this.attr("id")
		let docNode=this._doc.getNode(id0);
		(new this.constructor(this.state,nodes))._nodes
		.forEach(id=>{
			if(this._content.hasIn([id0,"children"]))
				this._content.updateIn([id0,"children"],c=>c.push(id))
			
			if(this._content.hasIn([id,"parent"]))
				this._content.updateIn([this._content.getIn([id,"parent"]),"children"],c=>c.delete(c.indexOf(id)))
			
			
			if(this._content.has(id))
				this._content.setIn([id,"parent"],id0)
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
		let docNode=this.file.get(this.attr("id"))
		let index=parent.get(0).get("children").indexOf(this.attr("id"))
		new this.constructor(this.state,nodes)
		._nodes
		.forEach((k,i)=>{
			if(this._content.hasIn([k,"parent"]))
				this._content.updateIn([this._content.getIn([k,"parent"]),"children"],c=>c.delete(c.indexOf(k)))
			
			this._content.setIn([k,"parent"],pid)
			this._content.updateIn([pid,"children"],c=>c.insert(index+i,k))
			docNode.after(this.file.get(k))
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
		let docNode=this.file.get(this.attr("id"))
		let index=parent.get(0).get("children").indexOf(this.attr("id"))
		new this.constructor(this.state,nodes)
		._nodes.reverse()
		.forEach((k,i)=>{
			if(this._content.hasIn([k,"parent"]))
				this._content.updateIn([this._content.getIn([k,"parent"]),"children"],c=>c.delete(c.indexOf(k)))
			
			this._content.setIn([k,"parent"],pid)
			this._content.updateIn([pid,"children"],c=>c.insert(index,k))
			docNode.before(this.file.get(k))
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
}
