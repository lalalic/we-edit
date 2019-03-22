import {uuid} from "we-edit"
import EditableDocument from "./editable"

export default class SerializableDocument extends EditableDocument{
	makeId(node,uid){
		const id=uid||node.id||super.makeId()
		node.set("id",uid||node.id||super.makeId())
		return id
	}

	/*find node by id*/
	getNode(id){
		return this.doc.get(id)
	}

	//always attached
	cloneNode({id}, keepId=false){
		const node=this.getNode(id)
		if(keepId){
			return node
		}else{
			const cloned=node
				.set("id",super.makeId())
				.updateIn(["children"],list=>{
					if(typeof(list)!=="string" && list){
						return list.map(a=>this.cloneNode({id:a},false).get("id"))
					}
					return list
				})
			this.attach(cloned)
			return cloned
		}
	}

	//return [/*cursor at first part*/{id,at},/*cursor at second part*/{id,at}]
	splitNode({id,type},at, firstKeepId=true){

	}

	/*
	at=0:before node{id},
	at=1:after node{id},
	create and attached when poisiton is falsy
	*/
	createNode(element, position/*{id,at=0}*/){

	}

	updateNode(element, changing){

	}

	removeNode(element){

	}

	/*append when referenceNode is falsy */
	insertNodeBefore(newNode,referenceNode,parentNode){

	}
	//prepend when referenceNode is falsy
	insertNodeAfter(newNode,referenceNode,parentNode){

	}

	//return constructed node
	//fromId==toId should be supported
	construct(fromId,toId){

	}

	attach(node){
		const id=this.makeId(node)
		this.doc.set(id,node)
		return id
	}
}
