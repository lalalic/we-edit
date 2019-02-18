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

	cloneNode(element, autoAttach=true, keepId=false){

	}

	splitNode(element,at){

	}

	tailerNode(element, from, to){

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

	toString(id){
		return `[${id}]`
	}
}
