import React from "react"
import { getFile } from "we-edit"

export default xQuery=>class extends xQuery{
    get file(){
        return getFile(this.state)
    }

	removeAttr(key){
		return this.attr(key,null)
	}

	//jsx document need following functions
	clone(deep=true){
        const clone1=(nodeId,parentNodeId)=>{
            const node=this._content.get(nodeId)
            const id=this.file.makeId()
            this._content.setIn(
                [id], 
                node.set('id',id)
                    .set('parent',parentNodeId)
                    .updateIn(['children'],children=>{
                        return typeof(children)=="string" ? children : (deep ? children.map(a=>clone1(a,id)) : [])
                    })
            )
            return id
        }
		const nodes=this._nodes.map(id=>clone1(id, parent=""))
        return new this.constructor(this.state, nodes)
	}

	/**
	 * insert this after node
	 * @param {*} selector 
	 * @returns 
	 */
	insertAfter(node){
		const $=new this.constructor(this.state,node)
		$.after(this)
		return this
	}

	/**
	 * insert this before node
	 */
	insertBefore(node){
		const $=new this.constructor(this.state,node)
		$.before(this)
		return this
	}

	/**
	 * insert this as first child of node
	 * @param {*} node 
	 */
	prependTo(node){
		const $=new this.constructor(this.state,node)
		$.prepend(this)
		return this
	}

	/**
	 * insert this as last child of node
	 */
	appendTo(node){
		const $=new this.constructor(this.state,node)
		$.append(this)
		return this
	}
}