import Immutable, {List} from "immutable"
import Query from "../../../state/selector/query"

export default class xQuery extends Query{
    //override
	_getContent(){
		return this.state.get("_content")
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

	toString(){
		return this._nodes.map(id=>this.file.toString(id)).join("\r\n")
	}

	before(node){
		const grandId=this.parent().attr("id")
		const id0=new this.constructor(this.state,node).attr('id')
		const id1=this.attr('id')
		this._content.updateIn([grandId,"children"],children=>
			children.splice(children.indexOf(id1),0,id0)
		)

		this._content.updateIn([id0,"parent"],parent=>{
			if(parent && this._content.has(parent)){
				this._content.updateIn([parent,"children"],children=>
					children.splice(children.indexOf(id0),1)
				)
			}
			return grandId
		})
		return this
	}

	after(node){
		const grandId=this.parent().attr("id")
		const id1=new this.constructor(this.state,node).attr('id')
		const id0=this.attr('id')
		this._content.updateIn([grandId,"children"],children=>
			children.splice(children.indexOf(id0)+1,0,id1)
		)

		this._content.updateIn([id1,"parent"],parent=>{
			if(parent && this._content.has(parent)){
				this._content.updateIn([parent,"children"],children=>
					children.splice(children.indexOf(id1),1)
				)
			}
			return grandId
		})
		return this
	}

	prepend(node){
		const id=new this.constructor(this.state,node).attr('id')
		this._content.updateIn([this.attr('id'),'children'],children=>
			children.splice(0,0,id)
		)

		this._content.updateIn([id,'parent'],parent=>{
			if(parent && this._content.has(parent)){
				this._content.updateIn([parent,"children"],children=>
					children.splice(children.indexOf(id),1)
				)
			}
			return this.attr('id')
		})
	}

	append(node){
		const id=new this.constructor(this.state,node).attr('id')

		this._content.updateIn([this.attr('id'),'children'],children=>
			children.splice(children.length-1,0,id)
		)

		this._content.updateIn([id,'parent'],parent=>{
			if(parent && this._content.has(parent)){
				this._content.updateIn([parent,"children"],children=>
					children.splice(children.indexOf(id),1)
				)
			}
			return this.attr('id')
		})
	}
}
