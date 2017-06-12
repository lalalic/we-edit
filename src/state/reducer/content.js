import Query from "state/selector/query"
import {getFile} from "state/selector"

export default class Content extends Query{
    constructor(){
        super(...arguments)
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
    			this._content=this._content.updateIn(path,value)
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
				.reduce((c,id)=>c.setIn([id,"children"],value),this._content)
			return this
        }
    }
	
	append(node){

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

	remove(){
		this._nodes.forEach(k=>{
			let node=this._content.get(k)
			this._content.remove(k)
			this._content.updateIn([node.get("parent"),"children"],c=>c.delete(c.indexOf(k)))
		})
		return this
	}

	replaceWith(){

	}

	empty(){

	}
}
