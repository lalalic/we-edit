import React from "react"
import { getFile } from "we-edit"

export default xQuery=>class extends xQuery{
    get file(){
        return getFile(this.state)
    }
	//jsx document need following functions
	clone(){
        const clone1=(nodeId,parentNodeId)=>{
            const node=this._content.get(nodeId)
            const id=this.file.makeId()
            this._content.setIn(
                [id], 
                node.set('id',id)
                    .set('parent',parentNodeId)
                    .updateIn(['children'],children=>{
                        return typeof(children)=="string" ? children : children.map(a=>clone1(a,id))
                    })
            )
            return id
        }
        const id=clone1(this.attr('id'), parent="")
        return new this.constructor(this.state, [id])
	}

	/**
	 * insert this after node
	 * @param {*} selector 
	 * @returns 
	 */
	insertAfter(node){
		const $=new this.constructor(this.state,node)
		if(!($.length==1 && $.attr('id'))){
			throw new Error('StateQuery.insertAfter must be a single node with id')
		}
		$.after(this)
		return this
	}

	/**
	 * insert this before node
	 */
	insertBefore(node){
		const $=new this.constructor(this.state,node)
		if(!($.length==1 && $.attr('id'))){
			throw new Error('StateQuery.insertBefore must be a single node with id')
		}
		$.before(this)
		return this
	}

	/**
	 * insert this as first child of node
	 * @param {*} node 
	 */
	prependTo(node){
		const $=new this.constructor(this.state,node)
		if(!($.length==1 && $.attr('id'))){
			throw new Error('StateQuery.insertAfter must be a single node with id')
		}
		$.prepend(this)
		return this
	}

	/**
	 * insert this as last child of node
	 */
	appendTo(node){
		const $=new this.constructor(this.state,node)
		if(!($.length==1 && $.attr('id'))){
			throw new Error('StateQuery.insertAfter must be a single node with id')
		}
		$.append(this)
		return this
	}

	makeId(node){
		const file=getFile(this.state)
		const id=file.makeId(node)
		
		return this
	}
}