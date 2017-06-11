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

	remove(node){

	}

	replaceWith(){

	}

	empty(){

	}
}
