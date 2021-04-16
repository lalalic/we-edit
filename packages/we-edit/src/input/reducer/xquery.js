import {List} from "immutable"
import Query from "../../state/selector/query"


export default class xQuery extends Query{
    //override
	_getContent(){
		return this.state.get("_content")
	}

	attr(k, v){
		if(arguments.length==1){
			return super.attr(...arguments)
		}else{
			this._nodes.forEach(id=>{
				if(v==null){
					this._content.deleteIn([id,'props',k])
				}else{
					this._content.setIn([id,'props',k],v)
				}
			})
			return this
		}
	}

	text(v){
		if(arguments.length==1){
			this._nodes.forEach(id=>{
				if(this._content.getIn([id,'type'])=='text'){
					this._content.setIn([id,'children'],v)
				}
			})
			return this
		}else{
			return super.text(...arguments)
		}
	}

	remove(deep=true){
		const clear=k=>{//clear the tree
			if(!deep){
                this._content.remove(k)
                return
            }

			const children=this._content.getIn([k,"children"])
			if(children instanceof List){
				children.forEach(id=>clear(id))
			}
            this._content.remove(k)
		}
		this._nodes.forEach(k=>{
			const parentId=this._content.getIn([k,"parent"])
			this._content.updateIn([parentId,"children"],children=>{
				if(children instanceof List){
					const i=children.indexOf(k)
					if(i!=-1){
						return children.splice(i,1)
					}
				}
				return children
			})
			clear(k)
		})
		return this
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
		return this
	}

	append(node){
		const id=new this.constructor(this.state,node).attr('id')

		this._content.updateIn([this.attr('id'),'children'],children=>
			children.splice(children.size-1,0,id)
		)

		this._content.updateIn([id,'parent'],parent=>{
			if(parent && this._content.has(parent)){
				this._content.updateIn([parent,"children"],children=>
					children.splice(children.indexOf(id),1)
				)
			}
			return this.attr('id')
		})
		return this
	}

	//jsx document need following functions
	clone(){

	}

	insertAfter(){
		
	}
}