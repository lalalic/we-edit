import {List} from "immutable"
import Query from "state/selector/query"
import {getFile} from "state/selector"

export default class Content extends Query{
    constructor(){
        super(...arguments)
        this._doc=getFile(this.state)
    }
	
	asNode(nodes){
		if(nodes instanceof Query)
			return nodes
		else 
			return this.constructor(this.state,nodes)
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
    			this._content=this._content.setIn(path,value)
    		}

            return this
        }
    }

    text(value){
        if(value==undefined)
            return super.text()
        else{
            this.filter("text").add(this.find("text"))
				._nodes
				.reduce((c,id)=>{
                    this._doc.updateNode(c.get(id).toJS(),{children:value})
                    return c.setIn([id,"children"],value)
                },this._content)
			return this
        }
    }

	append(nodes){
		nodes=this.asNode(nodes)
		let id0=this.attr("id")
		let docNode=this._doc.getNode(id0)
		nodes._nodes.forEach(id=>{
			this._content.updateIn([id0,"children"],c=>c.push(id))
			if(this._content.hasIn([id,"parent"])){
				this._content.updateIn([this._content.getIn([id,"parent"]),"children"],c=>c.delete(c.indexOf(id)))
			}
			this._content.setIn([id,"parent"],id0)
			docNode.append(this._doc.getNode(id))
		})
		return this
	}

	appendTo(parent){

	}

	prepend(node){

	}

	prependTo(target){

	}

	after(){

	}

	insertAfter(){

	}

	before(){

	}

	insertBefore(){

	}

	remove(deep=false){
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

	replaceWith(node){
		
	}

	empty(){

	}
}
