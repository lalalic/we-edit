/**
* concepts:
	node: content node
	element: state element, {type, props, id, parent}
*
*/
export default class {
	/*create/asign uid for node*/
	//root node's id must be "root"
	makeId(node,id){

	}

	/*find node by id*/
	getNode(id){

	}

	/*clone node without all ids*/
	cloneNode(node, autoAttach=true, keepId=false){

	}

	extendNode(node){
		return node
	}

	tailer(node, from, to){

	}

	createNode(element, reducer){

	}

	updateNode(element, changing, query){

	}

	removeNode(element){

	}

	insertNodeBefore(newNode,referenceNode,parentNode){

	}

	insertNodeAfter(newNode,referenceNode,parentNode){

	}

	construct(fromId,toId){

	}

	cloneRange(start,end){

	}

	toString(id){
		return `[${id}]`
	}
}
