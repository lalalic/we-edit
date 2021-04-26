import {List} from "immutable"
import Query from "../../state/selector/query"



export default class xQuery extends Query{
    //override
	_getContent(){
		return this.state.get("_content")
	}

	attr(k, v, forceSet=false){
		if(arguments.length==1){
			return super.attr(...arguments)
		}else{
			this._nodes.forEach(id=>{
				if(v==null){
					this._content.deleteIn([id,'props',k])
				}else if(typeof(v)=="object" && !forceSet){
					this._content.mergeDeepIn([id,'props',k],v)
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

	/**
	 * insert node before this
	 * @param {*} node 
	 * @returns 
	 */
	before(node){
		const grandId=this.parent().attr("id")
		if(!grandId){
			throw new Error("[content query]:can't insert node before an orphan node")
		}
		if(this.length>1){
			throw new Error("[content query]:can't insert node before multiple places")
		}
		
		const nodeIds=new this.constructor(this.state,node).toArray()
		nodeIds.forEach(id0=>{
			const id1=this.attr('id')
			this._content.updateIn([grandId,"children"],children=>{
				const i=children.indexOf(id0)
				i!=-1 && (children=children.splice(i,1))
				return children.splice(children.indexOf(id1),0,id0)
			})
	
			this._content.updateIn([id0,"parent"],parent=>{
				if(parent && this._content.has(parent) && parent!=grandId){
					this._content.updateIn([parent,"children"],children=>{
						const i=children.indexOf(id0)
						return i==-1 ? children : children.splice(i,1)
					})
				}
				return grandId
			})
		})
		return this
	}

	/**
	 * insert node after this
	 * @param {*} node 
	 * @returns 
	 */
	after(node){
		const grandId=this.parent().attr("id")
		if(!grandId){
			throw new Error("[content query]:can't insert node after an orphan node")
		}
		if(this.length>1){
			throw new Error("[content query]:can't insert node before multiple places")
		}
		const nodeIds=new this.constructor(this.state,node).toArray().reverse()
		nodeIds.forEach(id1=>{
			const id0=this.attr('id')
			//construct new relationship: parent->children
			this._content.updateIn([grandId,"children"],children=>{
				const i=children.indexOf(id1)
				i!=-1 && (children=children.splice(i,1))
				return children.splice(children.indexOf(id0)+1,0,id1)
			})
	
			//update old relationship: id1.parent=granId, and remove id1 from oldparent.children
			this._content.updateIn([id1,"parent"],parent=>{
				if(parent && this._content.has(parent) && parent!=grandId){
					this._content.updateIn([parent,"children"],children=>{
						const i=children.indexOf(id1)
						return i==-1 ? children : children.splice(i,1)
					})
				}
				return grandId
			})
		})
		
		return this
	}

	/**
	 * insert node as first child of this
	 */
	prepend(node){
		if(this.length>1){
			throw new Error("[content query]:can't insert node before multiple places")
		}
		const nodeIds=new this.constructor(this.state,node).toArray().reverse()
		nodeIds.forEach(id=>{
			this._content.updateIn([this.attr('id'),'children'],children=>{
				const i=children.indexOf(id)
				i!=-1 && (children=children.splice(i,1))
				return children.splice(0,0,id)
			})
	
			this._content.updateIn([id,'parent'],parent=>{
				if(parent && this._content.has(parent) && parent!=this.attr('id')){
					this._content.updateIn([parent,"children"],children=>{
						const i=children.indexOf(id)
						return i==-1 ? children : children.splice(i,1)
					})
				}
				return this.attr('id')
			})
		})
		
		return this
	}

	/**
	 * insert node as last child of this
	 * @param {*} node 
	 * @returns 
	 */
	append(node){
		if(this.length>1){
			throw new Error("[content query]:can't insert node before multiple places")
		}
		const nodeIds=new this.constructor(this.state,node).toArray()
		nodeIds.forEach(nodeId=>{
			this._content.updateIn([this.attr('id'),'children'],children=>{
				const i=children.indexOf(nodeId)
				i!=-1 && (children=children.splice(i,1))
				return children.splice(children.size,0,nodeId)
			})
	
			this._content.updateIn([nodeId,'parent'],parent=>{
				if(parent && this._content.has(parent) && parent!=this.attr('id')){
					this._content.updateIn([parent,"children"],children=>{
						const i=children.indexOf(nodeId)
						return i==-1 ? children : children.splice(i,1)
					})
				}
				return this.attr('id')
			})
		})
		
		return this
	}
}